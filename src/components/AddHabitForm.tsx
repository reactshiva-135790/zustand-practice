import { useState } from 'react'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper, Typography, InputAdornment } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import useHabitStore from '../store/store';


const AddhabitForm = () => {
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const addHabit = useHabitStore((s: any) => s.addHabit);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        addHabit({ name: name.trim(), frequency });
        setName('');
        setFrequency('daily');
    }
    return (
        <Paper elevation={3} sx={{ maxWidth: 720, width: '100%', mx: 'auto', p: { xs: 2, md: 3 }, borderRadius: 2 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <Box sx={{ flex: '1 1 60%', minWidth: 220 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Create a new habit</Typography>
                    <TextField
                        label="Habit Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Read 20 pages"
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AddCircleOutlineRoundedIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                        helperText="Give your habit a clear, short name"
                    />
                </Box>

                <Box sx={{ flex: '0 0 25%', minWidth: 160 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="frequency-label">Frequency</InputLabel>
                        <Select
                            labelId="frequency-label"
                            id="frequency-select"
                            value={frequency}
                            label="Frequency"
                            onChange={(e) => setFrequency(e.target.value)}
                            size="small"
                        >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ flex: '0 0 10%', minWidth: 80, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit" disabled={!name.trim()} variant="contained" color="primary" sx={{ height: 40, px: 2 }}>Add</Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default AddhabitForm