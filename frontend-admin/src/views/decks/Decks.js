import React from 'react';

// MATERIAL UI COMPONENTS
import { Box, Divider, Grid } from '@mui/material';
import { fetchGetDeckById } from 'src/services/DeckService';
import { useParams } from 'react-router-dom';

// MATERIAL UI COMPONENTS
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { fetchGetDecksByCourseId } from 'src/services/DeckService';

// MATERIAL UI COMPONENTS
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

// MATERIAL UI COMPONENTS
import { useNavigate } from 'react-router-dom';
import DeckItems from './components/DeckItems';
import { fetchGetCourseById } from 'src/services/CourseService';
import Button from '@mui/material/Button';

// MATERIAL UI COMPONENTS
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// MATERIAL UI COMPONENTS
import InputFileUpload from 'src/components/forms/theme-elements/InputFileUpload';
import CustomTextArea from '../../components/forms/theme-elements/CustomTextArea';
import { DEFAULT_DECK_IMAGE } from 'src/constants/image';
import { FormControlLabel, Switch } from '@mui/material';
import CustomSnackbar from '../../components/snackbar/CustomSnackbar';

import { toTitleCase } from '../../utilities/stringUtils';
import { isNameEmpty } from '../../utilities/stringUtils';
import { toSentenceCase } from '../../utilities/stringUtils';

import { fetchCreateCourse } from 'src/services/CourseService';

import { fetchCreateDeck } from 'src/services/DeckService';
import { fetchUpdateDeck } from 'src/services/DeckService';
import { fetchDeleteDeck } from 'src/services/DeckService';

import Pagination from '@mui/material/Pagination';

import { useLocation } from 'react-router-dom';
import DeleteConfirmModal from 'src/components/modal/DeleteConfirmModal';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Decks = () => {
  // ** USE STATE ** //
  // Course
  const courseId = useParams().courseId;
  const [course, setCourse] = React.useState({});

  // Deck
  const [decks, setDecks] = React.useState([]);
  const [selectedDeck, setSelectedDeck] = React.useState({});
  const [deletedDeckId, setDeletedDeckId] = React.useState(null);

  // Deck properties
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [previewImage, setPreviewImage] = React.useState(null);
  const [isPublic, setIsPublic] = React.useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCreateMode, setIsCreateMode] = React.useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const [modalSubmitName, setModalSubmitName] = React.useState();

  // Modal Validation
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [nameError, setNameError] = React.useState('');

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  // Pagination
  const [totalPages, setTotalPage] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalDecks, setTotalDecks] = React.useState(0);
  const [decksPerPage, setDecksPerPage] = React.useState(12);
  // Filter
  const [searchQuery, setSearchQuery] = React.useState(useParams().search_query || '');
  const [isPublicFilter, setIsPublicFilter] = React.useState(useParams().is_public || -1);

  const navigate = useNavigate();

  // ** GET ** //
  const handleGetCourse = async () => {
    try {
      const course = await fetchGetCourseById(courseId);
      if (course) {
        setCourse(course);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDecksByCourseId = async () => {
    try {
      const deckData = await fetchGetDecksByCourseId(
        courseId,
        currentPage,
        decksPerPage,
        isPublicFilter,
        searchQuery,
      );
      if (deckData) {
        setDecks(deckData.decks);
        setTotalPage(deckData.totalPages);
        setTotalDecks(deckData.total);
        if (currentPage > deckData.totalPages) {
          setCurrentPage(deckData.totalPages);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ** IMAGE ** //
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // ** VALIDATION ** //
  const isFormValid = () => {
    let isFormValid = true;
    setIsNameValid(true);
    setNameError('');
    if (isNameEmpty(name)) {
      setIsNameValid(false);
      isFormValid = false;
      setNameError('Tên không được để trống');
    }
    return isFormValid;
  };

  // ** CREATE ** //
  const handleCreateDeckClick = () => {
    setIsModalOpen(true);

    setSelectedDeck(null);
    setModalSubmitName('Tạo bộ thẻ');
    setIsCreateMode(true);
  };

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    const formData = new FormData();
    const newName = toTitleCase(name);
    const newDescription = toSentenceCase(description);
    formData.append('name', newName);
    formData.append('description', newDescription);
    formData.append('file', image);
    formData.append('course_id', courseId);
    try {
      const result = await fetchCreateDeck(formData);
      if (result.hasOwnProperty('error')) {
        setSnackbarMessage(result.error);
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        return;
      }

      setSnackbarMessage('Tạo bộ thẻ thành công');
      setSnackbarOpen(true);
      setSnackbarSeverity('success');
      refreshData();
      handleCloseModal();
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  // ** UPDATE ** //
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }

    const formData = new FormData();
    const newName = toTitleCase(name);
    const newDescription = toSentenceCase(description);
    formData.append('name', newName);
    formData.append('description', newDescription);
    formData.append('file', image);
    formData.append('course_id', courseId);
    formData.append('is_public', isPublic);
    try {
      const result = await fetchUpdateDeck(selectedDeck.id, formData);
      if (result.hasOwnProperty('error')) {
        setSnackbarMessage(result.error);
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        return;
      }

      setSnackbarMessage('Chỉnh sửa bộ thẻ thành công');
      setSnackbarOpen(true);
      setSnackbarSeverity('success');
      handleGetCourse();
      handleGetDecksByCourseId();
      setName(newName);
      setDescription(newDescription);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
      console.log(error);
    }
  };

  const handleUpdateDeckClick = (deck) => {
    setSelectedDeck(deck);
    setIsModalOpen(true);
    setModalSubmitName('Chỉnh sửa bộ thẻ');
    setIsCreateMode(false);
  };

  // ** DELETE ** //
  const handleDeleteDeck = async (deckId) => {
    try {
      const result = await fetchDeleteDeck(deckId);
      if (result) {
        setDeletedDeckId(null);
        setSnackbarMessage('Xóa bộ thẻ thành công');
        setSnackbarOpen(true);
        setSnackbarSeverity('success');
        refreshData();
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleDeleteDeckClick = (deckId) => {
    setDeletedDeckId(deckId);
    setIsOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteDeck(deletedDeckId);
    setIsOpenDeleteModal(false);
  };

  // ** MODAL ** //
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsNameValid(true);
    setSelectedDeck(null);
    setIsNameValid(true);
    setNameError('');
    resetModal();
  };

  // ** REFRESH DATA ** //
  const refreshData = () => {
    handleGetCourse();
    handleGetDecksByCourseId();
  };

  const resetModal = () => {
    setName('');
    setDescription('');
    setImage(DEFAULT_DECK_IMAGE);
    setPreviewImage(DEFAULT_DECK_IMAGE);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isPublic') {
      setIsPublicFilter(value);
    }
  };

  const handleSearchClick = () => {
    const isPublic = isPublicFilter === -1 ? '' : isPublicFilter;
    console.log('fdsafkadsfldsafljasdjk', isPublic);

    navigate(`/courses/${courseId}/decks?search_query=${searchQuery}&is_public=${isPublic}`);
  };

  // ** USE EFFECT ** //
  React.useEffect(() => {
    if (selectedDeck) {
      setName(selectedDeck.name);
      setDescription(selectedDeck.description);
      setPreviewImage(selectedDeck.image_url);
      setIsPublic(selectedDeck.is_public);
    } else {
      resetModal();
    }
  }, [selectedDeck]);

  React.useEffect(() => {
    if (currentPage === 0) {
      setCurrentPage(Math.min(currentPage, totalPages));
      return;
    }

    refreshData();
  }, [currentPage]);

  const location = useLocation();
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    setCurrentPage(page ? parseInt(page) : 1);
    refreshData();
  }, [location]);

  return (
    <Box>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              navigate('/courses');
            }}
          >
            Khóa học
          </Link>
          <Typography color="text.primary">Bộ thẻ</Typography>
        </Breadcrumbs>
      </Box>

      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Card>
              <CardMedia
                component="img"
                image={course.image_url}
                alt={course.name}
                sx={{ maxHeight: '200px', objectFit: 'contain' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Card>
              <CardContent sx={{ maxHeight: '200px' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {course.name}
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: '1.8rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {course.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider />
      <CustomSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
      <Box>
        <TextField
          label="Tìm kiếm bộ thẻ theo tên"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControl margin="normal" sx={{ mr: 2 }}>
          <InputLabel id="isPublic-label">Hiển thị</InputLabel>
          <Select
            labelId="isPublic-label"
            id="isPublic"
            name="isPublic"
            value={isPublicFilter}
            onChange={handleFilterChange}
            label="Is Public"
          >
            <MenuItem value={-1}>Tất cả</MenuItem>
            <MenuItem value={1}>Công khai</MenuItem>
            <MenuItem value={0}>Riêng tư</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
          sx={{ ml: 2, mt: 2 }}
        >
          Tìm kiếm và lọc
        </Button>
      </Box>
      <Box>
        <Modal
          open={isModalOpen}
          deck={selectedDeck}
          onClose={handleCloseModal}
          //onSave={() => console.log('Save changes')}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-style">
            <CustomSnackbar
              open={snackbarOpen}
              severity={snackbarSeverity}
              message={snackbarMessage}
              onClose={handleCloseModal}
            />
            <Typography variant="h6" id="modal-modal-title" sx={{ mt: 2 }}>
              {modalSubmitName}
            </Typography>
            <form method="post" encType="multipart/form-data">
              <Box className="image-modal-style">
                <img
                  src={previewImage}
                  alt="Course"
                  style={{ maxWidth: '100%', maxHeight: '140px' }}
                />
              </Box>
              <InputFileUpload title={'Choose image'} onChange={handleImageChange} name={'file'} />
              <TextField
                fullWidth
                label="Name"
                defaultValue=""
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!isNameValid}
                helperText={nameError}
                required
              />
              <CustomTextArea
                label={'Mô tả'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box>
                {!isCreateMode && (
                  <FormControlLabel
                    control={<Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />}
                    label="Công khai"
                  />
                )}
              </Box>
              {isCreateMode && (
                <Button onClick={handleCreateDeck} variant="contained" color="error" sx={{ mt: 2 }}>
                  Thêm bộ thẻ
                </Button>
              )}
              {!isCreateMode && (
                <Button
                  onClick={handleUpdateCourse}
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                >
                  Sửa bộ thẻ
                </Button>
              )}
              <Button onClick={handleCloseModal} variant="text" sx={{ mt: 2 }}>
                Close
              </Button>
            </form>
          </Box>
        </Modal>

        <DeleteConfirmModal
          open={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          objectName="khóa học"
        />
      </Box>

      <Box>
        {/* <Typography variant="h5">
          Số lượng bộ thẻ: {course.deck_count}/{course.deck_limit}
        </Typography> */}
        <Button variant="contained" sx={{ margin: '8px' }} onClick={() => handleCreateDeckClick()}>
          Tạo bộ thẻ
        </Button>
        <Typography variant="h4">Số lượng bộ thẻ: {totalDecks}</Typography>
        <DeckItems
          decks={decks}
          onUpdateDeckClick={(deck) => handleUpdateDeckClick(deck)}
          onDeleteDeckClick={(deckId) => handleDeleteDeckClick(deckId)}
        ></DeckItems>
      </Box>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => {
          navigate(`/courses/${courseId}/decks?page=${page}`);
        }}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </Box>
  );
};

export default Decks;
