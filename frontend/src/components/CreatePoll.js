import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Grid, Paper } from '@mui/material';

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']); // Initially, provide two empty options

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., sending poll data to the server)
        console.log('Poll question:', question);
        console.log('Poll options:', options);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Create a Poll
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Poll Question"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                    <Typography variant="h6" gutterBottom>
                        Poll Options
                    </Typography>
                    {options.map((option, index) => (
                        <Grid container spacing={2} key={index}>
                            <Grid item xs={10}>
                                <TextField
                                    label={`Option ${index + 1}`}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => removeOption(index)}
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                    <Button
                        variant="outlined"
                        onClick={addOption}
                    >
                        Add Option
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                    >
                        Create Poll
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default CreatePoll;
