import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import NinoForm from '../Form/NinoForm'
import { Nino } from '../../../types/nino';

export default function DashboardAdd() {
  const [ninos, setNinos] = useState<Array<Nino>>([]);


  return (
    <Container >
        <NinoForm />
    </Container>
  )
}
