import { Box, Typography } from "@mui/material";

type ShareTextProps = {
    sectionName: string;
    text: string;
};

const ShareText = ({ sectionName, text }: ShareTextProps) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {sectionName}:
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                {text}
            </Typography>
        </Box>
    );
};

export default ShareText;   