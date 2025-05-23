import type React from "react"

interface Activity {
  id: string
  type: "user_delete" | "session_reschedule"
  title: string
  description: string
  time: string
}

interface ActivityListProps {
  activities: Activity[]
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex">
          <div className="mr-3 flex-shrink-0">
            {activity.type === "user_delete" ? (
              <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500"></div>
            ) : (
              <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{activity.title}</div>
            <p className="text-sm text-gray-600">{activity.description}</p>
            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityList
