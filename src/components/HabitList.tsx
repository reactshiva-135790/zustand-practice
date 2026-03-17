import React from 'react'
import { List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Paper, Typography, Box, IconButton, Tooltip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import useHabitStore from '../store/store'

const HabitList: React.FC = () => {
    const habits = useHabitStore((s: any) => s.habits || [])
    const removeHabit = useHabitStore((s: any) => s.removeHabit)
    const toggleComplete = useHabitStore((s: any) => s.toggleComplete)

    const todayKey = new Date().toISOString().split('T')[0]

    if (!habits.length) {
        return (
            <Paper sx={{ mt: 3, p: 3 }} elevation={1}>
                <Typography variant="body1" color="text.secondary">No habits yet — add one above.</Typography>
            </Paper>
        )
    }

    return (
        <Paper sx={{ mt: 3, p: 1 }} elevation={1}>
            <List>
                {habits.map((h: any) => {
                    const doneToday = h.completeDates?.includes(todayKey)
                    return (
                    <ListItem key={h.id} divider>
                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography sx={{ textDecoration: doneToday ? 'line-through' : 'none' }}>{h.name}</Typography>
                                </Box>
                            }
                            secondary={new Date(h.createDate).toLocaleString()}
                        />
                        <ListItemSecondaryAction>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Chip label={h.frequency} size="small" />
                                <Tooltip title={doneToday ? 'Unmark today' : 'Mark today complete'}>
                                    <IconButton edge="end" size="small" onClick={() => toggleComplete(h.id)}>
                                        {doneToday ? <CheckCircleOutlineIcon color="success" /> : <RadioButtonUncheckedIcon />}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove habit">
                                    <IconButton edge="end" size="small" onClick={() => removeHabit(h.id)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </ListItemSecondaryAction>
                    </ListItem>
                    )
                })}
            </List>
        </Paper>
    )
}

export default HabitList
