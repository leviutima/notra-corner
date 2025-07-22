interface descriptionInputActivitieProps {
  activitieDescription: string
}

export function DescriptionInputActivitie({activitieDescription}: descriptionInputActivitieProps) {
  return(
    <div>
      <p>{activitieDescription}</p>
    </div>
  )
}