import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
// redux
import { useDispatch } from 'react-redux';
import { contentPage } from '../../redux/actions/subPage.action'

const ModuleCard = ({ moduleId, content }) => {

    const contentId = content.id

    const dispatch = useDispatch();

    const theme = useTheme();

    return (

        <Card sx={{ display: 'flex', mb: 2 }} >
            <CardContent sx={{ mt: 1.5, ml: 2 }}>
                <Typography component="div" variant="h7"  >
                    {content.number}.
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={
                    () => dispatch(contentPage(({
                        moduleId: moduleId,
                        contentId: contentId
                    })))
                }
            >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h7">
                        {content.title}
                    </Typography>
                    <Typography variant="caption text" color="text.secondary" >
                        {content.desc}
                    </Typography>
                </CardContent>
            </Box>
            <CardContent sx={{ ml: 'auto' }}>
                <Typography component="div" variant="h7">
                    <Checkbox onClick={() => console.log(contentId)} />
                </Typography>
            </CardContent>
        </Card>

    );
}

export default ModuleCard;