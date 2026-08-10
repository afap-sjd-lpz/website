const siteverifyUrl =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const expectedAction = "contact_form";
const testingAction = "test";
const officialTestingSecretKey =
  "1x0000000000000000000000000000000AA";
const maximumTokenLength = 2048;

export type TurnstileErrorCategory =
  | "configuration_error"
  | "invalid_token"
  | "action_mismatch"
  | "hostname_mismatch"
  | "unexpected_response"
  | "unavailable";

export type TurnstileVerificationResult =
  | { success: true }
  | {
      success: false;
      category: TurnstileErrorCategory;
    };

interface SiteverifyResponse {
  success?: unknown;
  hostname?: unknown;
  action?: unknown;
}

function getExpectedHostname(): string | undefined {
  const hostname = process.env.TURNSTILE_EXPECTED_HOSTNAME?.trim();

  return hostname || undefined;
}

export async function verifyTurnstileToken(
  token: string,
): Promise<TurnstileVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();
  const expectedHostname = getExpectedHostname();
  const isProduction = process.env.NODE_ENV === "production";
  const isOfficialTestingSecret =
    secretKey === officialTestingSecretKey;

  if (
    !secretKey ||
    (isProduction &&
      (!expectedHostname || isOfficialTestingSecret))
  ) {
    return {
      success: false,
      category: "configuration_error",
    };
  }

  const normalizedToken = token.trim();

  if (
    !normalizedToken ||
    normalizedToken.length > maximumTokenLength
  ) {
    return {
      success: false,
      category: "invalid_token",
    };
  }

  let response: Response;

  try {
    response = await fetch(siteverifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: normalizedToken,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return {
      success: false,
      category: "unavailable",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      category: "unavailable",
    };
  }

  let result: SiteverifyResponse;

  try {
    result = (await response.json()) as SiteverifyResponse;
  } catch {
    return {
      success: false,
      category: "unexpected_response",
    };
  }

  if (result.success !== true) {
    return {
      success: false,
      category: "invalid_token",
    };
  }

  const expectedResultAction =
    !isProduction && isOfficialTestingSecret
      ? testingAction
      : expectedAction;

  if (result.action !== expectedResultAction) {
    return {
      success: false,
      category: "action_mismatch",
    };
  }

  if (isProduction && result.hostname !== expectedHostname) {
    return {
      success: false,
      category: "hostname_mismatch",
    };
  }

  return { success: true };
}
