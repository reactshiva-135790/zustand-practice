import { Container, Typography } from "@mui/material";
import useHabitStore from "./store/store";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import PhotosGallery from "./components/PhotosGallery";

const App = () => {
  const store = useHabitStore();
  console.log(store);
  return (
     <Container>
        <Typography variant="h5" component="h5" align="center" gutterBottom>
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitList />
        <PhotosGallery />
     </Container>
  );
};

export default App; 