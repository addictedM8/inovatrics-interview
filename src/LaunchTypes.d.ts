interface LaunchesPast {
    launchesPast: Launch[];
}

interface Launch {
    launch_date_local: Date
    // launch_site: LaunchSite
    launch_success: Boolean
    launch_year: string
    links: LaunchLinks
    mission_id: [string]
    mission_name: string
    rocket: LaunchRocket
}

interface LaunchLinks {
    article_link: string
    video_link: string
}

interface LaunchRocket {
    rocket_name: string
    first_stage: LaunchRocketFirstStage
    second_stage: LaunchRocketSecondStage
}

interface LaunchRocketFirstStage {
    cores: [LaunchRocketFirstStageCore]
}

interface LaunchRocketFirstStageCore {
    land_success: boolean
}

interface LaunchRocketSecondStage {
    payloads: [LaunchRocketSecondStageCore]
}

interface LaunchRocketSecondStageCore {
    payload_mass_kg: number
    payload_mass_lbs: number
    payload_type: string
}

interface Details {
    name: string,
    description?: string,
    link: string,
    youtubeLink?: string,
    date?: Date,
}