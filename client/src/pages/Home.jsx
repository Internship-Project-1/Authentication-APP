import React from 'react';
import { App, Panel, View, Page, Block, Navbar, Row, Col, Button, Link, NavLeft, NavRight, NavTitle } from 'framework7-react';

export default () => (
    <Page id="panel-page">
        <Navbar>
          <NavTitle>User Authentication</NavTitle>
          <NavRight>
          <Link panelOpen="left">
              <span class="material-icons">
                menu
              </span>
            </Link>
          </NavRight>
        </Navbar>
        <div class="IntroTitle">User Authentication</div>
        <div class="IntroImage"><span class="material-icons">
          lock
        </span></div>
        <div class="IntroLoginBtn"><a class="button button-round button-fill">Login</a></div>
        <div class="IntroSignupBtn">Not registered yet ? <a href="/signup/">Signup</a> now for free.</div>
        <div class="IntroCopyright">Copyright 2022 Group30. All Rights Reserved.</div>
      </Page>
  )