import { Box, Chip } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

const CourseTags = ({ is_public, is_need_pro = null }) => {
  return (
    <Box>
      {is_public && (
        <Chip
          label="Công khai"
          variant="outlined"
          color="success"
          size="small"
          icon={<FaceIcon />}
          sx={{ mr: 1 }}
        />
      )}
      {!is_public && (
        <Chip
          label="Riêng tư"
          variant="outlined"
          color="error"
          size="small"
          icon={<FaceIcon />}
          sx={{ mr: 1 }}
        />
      )}

      {is_need_pro != null && !is_need_pro && (
        <Chip
          label="Miễn phí"
          variant="outlined"
          color="default"
          size="small"
          icon={<FaceIcon />}
        />
      )}
      {is_need_pro != null && is_need_pro && (
        <Chip label="Pro" variant="outlined" color="secondary" size="small" icon={<FaceIcon />} />
      )}
    </Box>
  );
};

export default CourseTags;
