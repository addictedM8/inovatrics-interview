import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import YouTube, { YouTubeProps } from 'react-youtube';

// http://www.youtube.com/watch?v=u8nQa1cJyX8&a=GxdCwVVULXctT2lYDEPllDR0LRTutYfW
// http://www.youtube.com/watch?v=u8nQa1cJyX8
// https://youtu.be/J442-ti-Dhg
const parseYoutubeId = (url?: string) => {
    var video_id = url?.split('v=')[1] || url?.split('youtu.be/')[1];
    var ampersandPosition = video_id?.indexOf('&');
    if (ampersandPosition != -1) {
        video_id = video_id?.substring(0, ampersandPosition);
    }
    return video_id;
}

export default function Detail(props: Details) {
    const { name, link, youtubeLink, date } = props;

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // autoplay: 1,
        },
    };

    return <Card sx={{ minWidth: 275 }}>
        <CardContent style={{ padding: 'unset' }}>
            <YouTube key={youtubeLink} videoId={parseYoutubeId(youtubeLink)} opts={opts} />
            <CardHeader
                action={
                    <IconButton aria-label="share" href={link} target="_blank">
                        <ShareIcon />
                    </IconButton>
                }
                title={name}
                subheader={date?.toString()}
            />
        </CardContent>
    </Card>
}