import React, { useEffect } from 'react'
import { Box, Button, CircularProgress, Alert, ImageList, ImageListItem, Typography, Paper } from '@mui/material'
import useHabitStore from '../store/store'

const PhotosGallery: React.FC = () => {
  const photos = useHabitStore((s: any) => s.photos || [])
  const loading = useHabitStore((s: any) => s.photosLoading)
  const error = useHabitStore((s: any) => s.photosError)
  const fetchPhotos = useHabitStore((s: any) => s.fetchPhotos)
  const clearPhotos = useHabitStore((s: any) => s.clearPhotos)

  return (
    <Paper sx={{ mt: 3, p: 2 }} elevation={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Photos Gallery</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={() => fetchPhotos(24)} variant="outlined" size="small">Reload</Button>
          <Button onClick={() => clearPhotos()} variant="text" color="inherit" size="small">Clear</Button>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && photos && photos.length > 0 && (
        <ImageList variant="masonry" cols={4} gap={8}>
          {photos.map((p: any) => (
            <ImageListItem key={p.id}>
              <img src={p.thumbnailUrl} alt={p.title} loading="lazy" style={{ borderRadius: 6 }} />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {!loading && !error && (!photos || photos.length === 0) && (
        <Typography color="text.secondary">No photos loaded. Click "Load Photos" to fetch sample images.</Typography>
      )}
    </Paper>
  )
}

export default PhotosGallery

