import React, { useEffect, useState } from 'react';
import { Page, Navbar, Link, NavLeft, NavRight, NavTitle, List, ListInput, Button, Block, Col, Row, f7 } from 'framework7-react';
import { f7ready } from 'framework7-react';

const DoRegister = (e) => {
    e.preventDefault();
    const formData = f7.form.convertToData(e.target)
    f7.dialog.alert(JSON.stringify(formData), "Authentication App")
}

export default () => {
    useEffect(() => {
        f7ready((f7) => {
            //f7.dialog.alert('Component mounted');
            //Setname("test")
        })
    }, []);
    const [name, Setname] = useState();
    const [username, Setusername] = useState();
    const [email, Setemail] = useState();
    const [mobile, Setmobile] = useState();
    const [imageurl, Setimageurl] = useState();
    const [password, Setpassword] = useState();
    const [confirmpassword, Setconfirmpassword] = useState();
    return (
        <Page name="profile">
            <Navbar>
                <NavLeft backLink="Back"></NavLeft>
                <NavTitle>User Authentication</NavTitle>
                <NavRight>
                    <Link panelOpen="left">
                        <span class="material-icons">
                            menu
                        </span>
                    </Link>
                </NavRight>
            </Navbar>
            <List noHairlinesMd form onSubmit={(e) => DoRegister(e)}>
                <ListInput
                    outline
                    label="Name"
                    name="Name"
                    value={name}
                    onChange={(e) => Setname(e.target.value)}
                    floatingLabel
                    type="text"
                    placeholder="Name"
                    validate
                    clearButton
                >
                </ListInput>
                <ListInput
                    outline
                    label="Username"
                    name="Username"
                    value={username}
                    onChange={(e) => Setusername(e.target.value)}
                    floatingLabel
                    type="text"
                    placeholder="Username"
                    validate
                    clearButton
                >
                </ListInput>
                <ListInput
                    outline
                    label="Email"
                    name="Email"
                    value={email}
                    onChange={(e) => Setemail(e.target.value)}
                    floatingLabel
                    type="email"
                    placeholder="Email"
                    validate
                    clearButton
                >
                </ListInput>
                <ListInput
                    outline
                    label="Mobile"
                    name="Mobile"
                    value={mobile}
                    onChange={(e) => Setmobile(e.target.value)}
                    floatingLabel
                    type="number"
                    placeholder="Mobile"
                    validate
                    clearButton
                ></ListInput>
                <ListInput
                    outline
                    label="Image URL"
                    name="ImageURL"
                    value={imageurl}
                    onChange={(e) => Setimageurl(e.target.value)}
                    floatingLabel
                    type="text"
                    placeholder="Image URL"
                    validate
                    clearButton
                ></ListInput>
                <ListInput
                    outline
                    label="Password"
                    name="Password"
                    value={password}
                    onChange={(e) => Setpassword(e.target.value)}
                    floatingLabel
                    type="password"
                    placeholder="Password"
                    validate
                    clearButton
                ></ListInput>
                <ListInput
                    outline
                    label="Confirm Password"
                    name="ConfirmPassword"
                    value={confirmpassword}
                    onChange={(e) => Setconfirmpassword(e.target.value)}
                    floatingLabel
                    type="password"
                    placeholder="Confirm Password"
                    validate
                    clearButton
                ></ListInput>
                <Block>
                    <Row>
                        <Col>
                            <Button fill type="submit">Signup</Button>
                        </Col>
                    </Row>
                </Block>
            </List>
        </Page >
    )
}
