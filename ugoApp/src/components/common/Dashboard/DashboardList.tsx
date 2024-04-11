import { Grid, List } from 'semantic-ui-react'
import NinoList from './NinoList';

export default function Dashboard() {
 return (
    <Grid>
      <Grid.Column width='10'>
        <NinoList />
      </Grid.Column>
    </Grid>
  )
}
