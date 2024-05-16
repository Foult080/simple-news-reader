import React from 'react'
import { Container, Grid, Header, List } from 'semantic-ui-react'

const Footer = () => {
  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Column textAlign="center">
          <Header as="h4" content="News Reader" />
          <List link>
            <List.Item as="a" target="_blank" href="https://github.com/Foult080">
              Created by @foult080
            </List.Item>
          </List>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default Footer
