import React from 'react';
import { App, Panel, View, Page, Block, Navbar, Row, Col, Button, Link, NavLeft, NavRight, NavTitle } from 'framework7-react';
import Routes from './Routes'
import './panel.css'

export default () => (
  <App routes={Routes}>
    <Panel resizable left cover>

    </Panel>
    <View url="/" main>
       
    </View>
  </App>
);