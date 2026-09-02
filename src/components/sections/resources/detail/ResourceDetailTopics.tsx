interface ResourceDetailTopic {
  _id: string
  name: string
}

export interface ResourceDetailTopicsProps {
  topics: ResourceDetailTopic[]
}

export function ResourceDetailTopics({topics}: ResourceDetailTopicsProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <li
          key={topic._id}
          className="rounded-full bg-secondary/10 px-3 py-1 text-xs"
        >
          {topic.name}
        </li>
      ))}
    </ul>
  )
}
