// src/app/userdata/page.tsx
"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import comunidades from '../../../public/arbol.json'

function Page() {
    const { data: session } = useSession();
    const [nick, setNick] = useState('');
    const [birthday, setBirthday] = useState('');
    const [towns, setTowns] = useState<{ parent_code: string; code: string; label: string; }[]>([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedTown, setSelectedTown] = useState('');

    // Extraer todas las provincias una sola vez
    const opcionesProvincias = comunidades.flatMap(comunidad => comunidad.provinces.map(provincia => ({
        value: provincia.code,
        label: provincia.label,
        towns: provincia.towns
    })));

    const handleProvinceChange = (e: SelectChangeEvent) => {
        const newSelectedProvince = e.target.value;
        setSelectedProvince(newSelectedProvince);
    
        // Encuentra la provincia seleccionada y actualiza las localidades
        const foundProvince = opcionesProvincias.find(provincia => provincia.value === newSelectedProvince);
        setTowns(foundProvince ? foundProvince.towns : []);
    };
    

    // Funciones para manejar cambios en los Selects, similar a tu lógica existente...

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Box width="66.66%" maxWidth={600} mx="auto">
                <form>
                    <TextField
                        label="Email"
                        type="email"
                        value={session?.user?.email || ''}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />

                    <TextField
                        label="Nombre"
                        type="text"
                        value={session?.user?.name || ''}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />

                    <TextField
                        label="Nick"
                        type="text"
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                        fullWidth
                        margin="normal"
                        inputProps={{ maxLength: 64 }}
                    />

                    <TextField
                        label="Cumpleaños"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Provincia</InputLabel>
                        <Select
                            value={selectedProvince}
                            onChange={(e: SelectChangeEvent) => handleProvinceChange(e)}
                            label="Provincia"
                        >
                            {opcionesProvincias.map((opcion) => (
                                <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Población</InputLabel>
                        <Select
                            value={selectedTown}
                            onChange={(e) => setSelectedTown(e.target.value)}
                            label="Población"
                            disabled={!selectedProvince}
                        >
                            {/* Aquí mapearías las poblaciones a MenuItems */}
                            {towns.map((town) => (
                                <MenuItem key={town.code} value={town.label}>{town.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Guardar Cambios
                        </Button>
                    </Box>

                </form>
            </Box>
        </Box>
    );
}

export default Page;
