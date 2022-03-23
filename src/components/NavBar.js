import { useState, } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../reducers/authReducer'

const NavBar = ({ oldUrl }) => {
    const [isOpen, setIsOpen] = useState(false);

    let navigate = useNavigate()
    const dispatch = useDispatch()
    
    let auth = useSelector(state => state.authReducer)
    const user = localStorage.getItem('user')

    if (user) {
        auth = JSON.parse(user)
    }

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const goBack = () => {
        navigate(oldUrl);
    }

    const getOut = () => {
        dispatch({ type: LOGIN_USER, payload: false });
        localStorage.removeItem("user");
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <NavbarBrand>{auth.name}</NavbarBrand>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => goBack()}>
                                    Atras
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => getOut()}>
                                    Cerrar Sesion
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar