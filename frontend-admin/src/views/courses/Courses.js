import CourseItems from './components/CourseItems';
import PageContainer from 'src/components/container/PageContainer';
import { Box, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { fetchGetAllCourses } from 'src/services/CourseService';

import { useLocation } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import InputFileUpload from 'src/components/forms/theme-elements/InputFileUpload';
import {
  fetchUpdateCourse,
  fetchCreateCourse,
  fetchDeleteCourse,
} from 'src/services/CourseService';

import Pagination from '@mui/material/Pagination';
import { DEFAULT_COURSE_IMAGE } from 'src/constants/image';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { toTitleCase } from '../../utilities/stringUtils';
import { isNameEmpty } from '../../utilities/stringUtils';
import { toSentenceCase } from '../../utilities/stringUtils';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
import CustomSnackbar from '../../components/snackbar/CustomSnackbar';
import CustomTextArea from '../../components/forms/theme-elements/CustomTextArea';

import { Select, MenuItem, InputLabel } from '@mui/material';

import { useNavigate, useParams } from 'react-router';
const Courses = () => {
  const [courses, setCourses] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = React.useState({});
  // const [courseUpdated, setCourseUpdated] = React.useState(false);
  const [deletedCourseId, setDeletedCourseId] = React.useState(null);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [coursesPerPage] = React.useState(12);
  const [totalPages, setTotalPages] = React.useState(0);
  const [totalCourses, setTotalCourses] = React.useState(0);

  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [previewImage, setPreviewImage] = React.useState(null);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCreateMode, setIsCreateMode] = React.useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const [modalSubmitName, setModalSubmitName] = React.useState();

  const [isNameValid, setIsNameValid] = React.useState(true);
  const [nameError, setNameError] = React.useState('');

  const [isPublic, setIsPublic] = React.useState(false);
  const [isNeedPro, setIsNeedPro] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState(useParams().search_query || '');
  const [isPublicFilter, setIsPublicFilter] = React.useState(useParams().is_public || -1);
  const [isNeedProFilter, setIsNeedProFilter] = React.useState(useParams().is_need_pro || -1);

  const navigate = useNavigate();
  const fetchCourses = async () => {
    const fetchedCourses = await fetchGetAllCourses(
      currentPage,
      coursesPerPage,
      searchQuery,
      isPublicFilter,
      isNeedProFilter,
    );
    if (fetchedCourses) {
      setCourses(fetchedCourses.courses);
      setTotalPages(fetchedCourses.totalPages);
      setTotalCourses(fetchedCourses.total);
      if (currentPage > fetchedCourses.totalPages) {
        setCurrentPage(fetchedCourses.totalPages);
        return;
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

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
    formData.append('is_public', isPublic);
    formData.append('is_need_pro', isNeedPro);
    try {
      const result = await fetchUpdateCourse(selectedCourse.id, formData);
      console.log(result.hasOwnProperty('error'));
      if (result.hasOwnProperty('error')) {
        setSnackbarMessage(result.error);
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        return;
      }
      setSnackbarMessage('Cập nhật khóa học thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchCourses();
      setImage(null);
      setName(newName);
      setDescription(newDescription);
      //handleCloseModal();
    } catch (error) {
      setSnackbarMessage(error.message); // Set the error message
      setSnackbarOpen(true); // Open the Snackbar to show the error
      console.error(error);
    }
  };

  const handleCreateCourse = async (e) => {
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
    try {
      const result = await fetchCreateCourse(formData);
      if (result.hasOwnProperty('error')) {
        setSnackbarMessage(result.error);
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        return;
      }

      setSnackbarMessage('Tạo khóa học thành công');
      setSnackbarOpen(true);
      setSnackbarSeverity('success');
      fetchCourses();
      handleCloseModal();
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const result = await fetchDeleteCourse(courseId);
      console.log(result);
      if (result.hasOwnProperty('error')) {
        setSnackbarSeverity('error');
        setSnackbarMessage(result.error);
        setSnackbarOpen(true);
        console.log(result.error);
        return;
      }
      setSnackbarSeverity('success');
      setSnackbarMessage('Xóa khóa học thành công');
      setSnackbarOpen(true);
      fetchCourses();
      handleCloseModal();
      console.log('Deleted course');
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsNameValid(true);
    setSelectedCourse(null);
    setIsNameValid(true);
    setNameError('');
  };

  const handleUpdateCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setModalSubmitName('Sửa khóa học');
    setIsCreateMode(false);
  };

  const handleCreateCourseClick = () => {
    setIsModalOpen(true);
    setName('');
    setDescription('');
    setImage(DEFAULT_COURSE_IMAGE);
    setPreviewImage(DEFAULT_COURSE_IMAGE);
    setModalSubmitName('Thêm khóa học');
    setIsCreateMode(true);
  };

  const handleDeleteCourseClick = (courseId) => {
    setDeletedCourseId(courseId);
    setIsOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteCourse(deletedCourseId);
    setIsOpenDeleteModal(false);
  };

  const handleSnackbarClose = (event) => {
    setSnackbarOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isPublic') {
      setIsPublicFilter(value);
    } else if (name === 'isNeedPro') {
      setIsNeedProFilter(value);
    }
  };

  const handleSearchClick = () => {
    const isPublic = isPublicFilter === -1 ? '' : isPublicFilter;
    const isNeedPro = isNeedProFilter === -1 ? '' : isNeedProFilter;

    navigate(`/courses?search_query=${searchQuery}&is_public=${isPublic}&is_need_pro=${isNeedPro}`);
  };

  React.useEffect(() => {
    if (selectedCourse) {
      setName(selectedCourse.name);
      setDescription(selectedCourse.description);
      setPreviewImage(selectedCourse.image_url);
      setIsPublic(selectedCourse.is_public);
      setIsNeedPro(selectedCourse.is_need_pro);
    } else {
      setName('');
      setDescription('');
      setImage(DEFAULT_COURSE_IMAGE);
      setPreviewImage(DEFAULT_COURSE_IMAGE);
      setIsPublic(false);
      setIsNeedPro(false);
    }
  }, [selectedCourse]);
  React.useEffect(() => {
    if (currentPage === 0) {
      setCurrentPage(Math.min(currentPage, totalPages));
      return;
    }
    fetchCourses();
    console.log(1);
  }, [currentPage]);

  const location = useLocation();
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    setCurrentPage(page ? parseInt(page) : 1);
    fetchCourses();
  }, [location]);

  return (
    <PageContainer title="Quản lý khóa học" description="Trang quản lý khóa học">
      <Box>
        <Typography variant="h1" id="modal-modal-title" sx={{ mt: 2 }}>
          Quản lý khóa học
        </Typography>
        <CustomSnackbar
          open={snackbarOpen}
          severity={snackbarSeverity}
          message={snackbarMessage}
          onClose={handleSnackbarClose}
        />
        <Box>
          <TextField
            label="Tìm kiếm khóa học theo tên"
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
          <FormControl margin="normal">
            <InputLabel id="isNeedPro-label">Cần Pro?</InputLabel>
            <Select
              labelId="isNeedPro-label"
              id="isNeedPro"
              name="isNeedPro"
              value={isNeedProFilter}
              onChange={handleFilterChange}
              label="Is Need Pro"
            >
              <MenuItem value={-1}>Tất cả</MenuItem>
              <MenuItem value={1}>Cần Pro</MenuItem>
              <MenuItem value={0}>Miễn phí</MenuItem>
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
        <Modal
          open={isModalOpen}
          course={selectedCourse}
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
              onClose={handleSnackbarClose}
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
              {!isCreateMode && (
                <Box>
                  <FormControlLabel
                    control={<Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />}
                    label="Công khai"
                  />
                  <FormControlLabel
                    control={
                      <Switch checked={isNeedPro} onChange={() => setIsNeedPro(!isNeedPro)} />
                    }
                    label="Cần Tài khoản Pro"
                  />
                </Box>
              )}
              {isCreateMode && (
                <Button
                  onClick={handleCreateCourse}
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                >
                  Thêm khóa học
                </Button>
              )}
              {!isCreateMode && (
                <Button
                  onClick={handleUpdateCourse}
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                >
                  Sửa khóa học
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
        <Button
          variant="contained"
          sx={{ margin: '8px' }}
          onClick={() => handleCreateCourseClick()}
        >
          Tạo khóa học
        </Button>
        <Typography variant="h4">Số lượng khóa học: {totalCourses}</Typography>
        <CourseItems
          courses={courses}
          onUpdateCourseClick={(course) => handleUpdateCourseClick(course)}
          onDeleteCourseClick={(courseId) => handleDeleteCourseClick(courseId)}
        ></CourseItems>
      </Box>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => navigate(`/courses?page=${page}`)}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </PageContainer>
  );
};

export default Courses;
