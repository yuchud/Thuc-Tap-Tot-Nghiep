import { Box, Card, CardMedia, Grid } from '@mui/material';
import React, { useEffect } from 'react';

import { fetchGetDeckById } from 'src/services/DeckService';
import { fetchCreateCard, fetchGetCardsByDeckId } from 'src/services/CardService';
import { useParams } from 'react-router';

import { CardContent, Divider, Typography } from '@mui/material';

import { Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router';

import CustomSnackbar from '../../components/snackbar/CustomSnackbar';

import { FormControlLabel, Switch } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import CustomTextArea from '../../components/forms/theme-elements/CustomTextArea';
import InputFileUpload from '../../components/forms/theme-elements/InputFileUpload';

import { fetchGetWordClasses } from 'src/services/WordClassService';
import CardItems from './components/CardItems';
import Modal from '@mui/material/Modal';

import { DEFAULT_DECK_IMAGE } from 'src/constants/image';

import { TabContext } from '@mui/lab';
import { TabList } from '@mui/lab';
import { TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';

import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import { set } from 'lodash';
import { tab } from '@testing-library/user-event/dist/tab';

import { fetchUpdateCard } from 'src/services/CardService';
import { fetchDeleteCard } from 'src/services/CardService';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
const Cards = () => {
  const navigate = useNavigate();

  // tab
  const [tabValue, setTabValue] = React.useState('1');

  // deck
  const deckId = useParams().deckId;
  const [deck, setDeck] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCardId, setDeletedCardId] = React.useState('');
  // word classes
  const [wordClasses, setWordClasses] = React.useState([]);
  // cards
  const [cards, setCards] = React.useState([]);

  // modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalSubmitName, setModalSubmitName] = React.useState('');
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);

  // card properties
  const [frontText, setFrontText] = React.useState('');
  const [wordClass, setWordClass] = React.useState('');
  const [backText, setBackText] = React.useState('');
  const [image, setImage] = React.useState('');
  const [previewImage, setPreviewImage] = React.useState('');
  const [isPublic, setIsPublic] = React.useState(false);

  //snakbar
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const [isCreateMode, setIsCreateMode] = React.useState(false);

  const [frontTextError, setFrontTextError] = React.useState('');
  const [backTextError, setBackTextError] = React.useState('');
  const [imageError, setImageError] = React.useState('');

  // ** VALIDATION ** //
  const isFrontTextValid = () => {
    let isFrontTextValid = true;
    if (frontText === '') {
      isFrontTextValid = false;
      setFrontTextError('Không được để trống');
    }
    return isFrontTextValid;
  };

  const isBackTextValid = () => {
    let isBackTextValid = true;
    if (backText === '') {
      isBackTextValid = false;
      setBackTextError('Không được để trống');
    }
    return isBackTextValid;
  };

  const isImageValid = () => {
    let isImageValid = true;
    if (image === '') {
      isImageValid = false;
      setImageError('Vui lòng chọn ảnh');
    }
    return isImageValid;
  };

  const isFormValid = () => {
    let isFormValid = true;
    setFrontTextError('');
    setBackTextError('');
    //setImageError('');
    const _isFrontTextValid = isFrontTextValid();
    const _isBackTextValid = isBackTextValid();
    //const isImageValid = isImageValid();
    if (_isFrontTextValid && !_isBackTextValid) {
      setTabValue('2');
    }
    if (!_isFrontTextValid || !_isBackTextValid) {
      isFormValid = false;
    }
    return isFormValid;
  };

  // ** GET ** //
  const handleGetDeck = async () => {
    try {
      const deck = await fetchGetDeckById(deckId);
      if (deck) {
        setDeck(deck);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCardsByDeckId = async () => {
    try {
      const cards = await fetchGetCardsByDeckId(deckId);
      if (cards) {
        setCards(cards);
      }
      console.log(cards);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetWordClasses = async () => {
    try {
      const wordClasses = await fetchGetWordClasses();
      if (wordClasses) {
        setWordClasses(wordClasses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ** CREATE ** //
  const handleCreateCardClick = () => {
    setIsModalOpen(true);
    resetModal();
    setModalSubmitName('Tạo thẻ');
    setIsCreateMode(true);
  };

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }

    const formData = new FormData();
    formData.append('front_text', frontText);
    formData.append('back_text', backText);
    formData.append('word_class_id', wordClass);
    formData.append('deck_id', deckId);
    formData.append('file', image);
    formData.append('is_public', isPublic);

    try {
      const result = await fetchCreateCard(formData);
      if (result.hasOwnProperty('error')) {
        setSnackbarMessage(result.error);
        setIsSnackbarOpen(true);
        setSnackbarSeverity('error');
        return;
      }
      setSnackbarMessage('Tạo thẻ thành công');
      setSnackbarSeverity('success');
      setIsSnackbarOpen(true);
      handleCloseModal();
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  // ** UPDATE ** //
  const handleUpdateCard = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }

    const formData = new FormData();
    formData.append('front_text', frontText);
    formData.append('back_text', backText);
    formData.append('word_class_id', wordClass);
    formData.append('deck_id', deckId);
    formData.append('file', image);
    formData.append('is_public', isPublic);

    try {
      const result = await fetchUpdateCard(selectedCard.id, formData);
      if (result.hasOwnProperty('error')) {
        setSnackbarMessage(result.error);
        setIsSnackbarOpen(true);
        setSnackbarSeverity('error');
        return;
      }
      setSnackbarMessage('Sửa thẻ thành công');
      setSnackbarSeverity('success');
      setIsSnackbarOpen(true);
      handleCloseModal();
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
    setModalSubmitName('Sửa thẻ');
    setIsCreateMode(false);
  };

  // ** DELETE ** //
  const handleDeleteCardClick = (cardId) => {
    setDeletedCardId(cardId);
    setIsOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteCard();
    setIsOpenDeleteModal(false);
  };

  const handleDeleteCard = async () => {
    try {
      const result = await fetchDeleteCard(deletedCardId);
      if (result.hasOwnProperty('error')) {
        setSnackbarMessage(result.error);
        setIsSnackbarOpen(true);
        setSnackbarSeverity('error');
        return;
      }
      setSnackbarMessage('Xóa thẻ thành công');
      setSnackbarSeverity('success');
      setIsSnackbarOpen(true);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  // ** TAB ** //
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  // ** SELECT ** //
  const handleSelectChange = (event) => {
    setWordClass(event.target.value);
  };

  // ** MODAL ** //
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ** IMAGE ** //
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // ** REFRESH DATA ** //
  const refreshData = () => {
    handleGetDeck();
    handleGetWordClasses();
    handleGetCardsByDeckId();
  };

  const resetModal = () => {
    setFrontText('');
    setBackText('');
    setImage('https://via.placeholder.com/150');
    setPreviewImage('https://via.placeholder.com/150');
    setFrontTextError('');
    setBackTextError('');
    setImageError('');
    setTabValue('1');
    setWordClass(1);
    setIsPublic(false);
  };

  // ** USE EFFECT ** //
  useEffect(() => {
    refreshData();
  }, []);

  React.useEffect(() => {
    if (selectedCard) {
      console.log(selectedCard);
      setFrontText(selectedCard.front_text);
      setBackText(selectedCard.back_text);
      setWordClass(`${selectedCard.word_class_id}`);
      setPreviewImage(selectedCard.front_image);
      setIsPublic(selectedCard.is_public);
      setTabValue('1');
    } else {
      resetModal();
    }
  }, [selectedCard]);

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
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/courses/${deck.course_id}/decks`);
            }}
          >
            Bộ thẻ
          </Link>
          <Typography color="text.primary">Thẻ</Typography>
        </Breadcrumbs>
      </Box>

      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Card>
              <CardMedia
                component="img"
                image={deck.image_url}
                alt={deck.name}
                sx={{ maxHeight: '200px', objectFit: 'contain' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card>
              <CardContent sx={{ maxHeight: '200px' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {deck.name}
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
                  {deck.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <CustomSnackbar
          open={isSnackbarOpen}
          severity={snackbarSeverity}
          message={snackbarMessage}
          onClose={() => setIsSnackbarOpen(false)}
        />
        <Modal
          open={isModalOpen}
          card={selectedCard}
          onClose={handleCloseModal}
          //onSave={() => console.log('Save changes')}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-style">
            <CustomSnackbar
              open={isSnackbarOpen}
              severity={snackbarSeverity}
              message={snackbarMessage}
              onClose={() => setIsSnackbarOpen(false)}
            />
            {/* <Typography variant="h6" id="modal-modal-title" sx={{ mt: 2 }}>
              {modalSubmitName}
            </Typography> */}
            <form method="post" encType="multipart/form-data">
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                    <Tab label="Mặt trước" value="1" />
                    <Tab label="Mặt sau" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box className="image-modal-style">
                    <img
                      src={previewImage}
                      alt="Course"
                      style={{ maxWidth: '100%', maxHeight: '140px' }}
                    />
                  </Box>
                  <InputFileUpload
                    title={'Choose image'}
                    onChange={handleImageChange}
                    name={'file'}
                  />
                  <TextField
                    fullWidth
                    label="Từ tiếng anh"
                    defaultValue=""
                    margin="normal"
                    value={frontText}
                    onChange={(e) => setFrontText(e.target.value)}
                    error={!!frontTextError}
                    helperText={frontTextError}
                    required
                  />
                  <InputLabel id="demo-simple-select-label">Từ loại</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={wordClass}
                    label="Từ loại"
                    onChange={handleSelectChange}
                  >
                    {wordClasses.map((wordClass) => (
                      <MenuItem key={wordClass.id} value={wordClass.id}>
                        {wordClass.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {!isCreateMode && (
                    <FormControlLabel
                      control={
                        <Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
                      }
                      label="Công khai"
                      sx={{ ml: 2 }}
                    />
                  )}
                </TabPanel>
                <TabPanel value="2">
                  <TextField
                    fullWidth
                    label="Nghĩa của từ"
                    defaultValue=""
                    margin="normal"
                    value={backText}
                    onChange={(e) => setBackText(e.target.value)}
                    error={!!backTextError}
                    helperText={backTextError}
                    required
                  />
                </TabPanel>
              </TabContext>

              {isCreateMode && (
                <Button onClick={handleCreateDeck} variant="contained" color="error" sx={{ mt: 2 }}>
                  Thêm thẻ
                </Button>
              )}
              {!isCreateMode && (
                <Button onClick={handleUpdateCard} variant="contained" color="error" sx={{ mt: 2 }}>
                  Sửa thẻ
                </Button>
              )}
              <Button onClick={handleCloseModal} variant="text" sx={{ mt: 2 }}>
                Hủy
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
        <Box>
          {/* <Typography variant="h5">
          Số lượng bộ thẻ: {course.deck_count}/{course.deck_limit}
        </Typography> */}
          <Button
            variant="contained"
            sx={{ margin: '8px' }}
            onClick={() => handleCreateCardClick()}
          >
            Tạo thẻ
          </Button>

          <CardItems
            cards={cards}
            wordClasses={wordClasses}
            onUpdateCardClick={(deck) => handleUpdateCardClick(deck)}
            onDeleteCardClick={(deckId) => handleDeleteCardClick(deckId)}
          ></CardItems>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Cards;
