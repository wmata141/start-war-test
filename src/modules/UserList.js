import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Table } from 'reactstrap'
import NavBar from '../components/NavBar'

const UserList = () => {
    const [films, setFilms] = useState([]);
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();

    let auth = useSelector(state => state.authReducer)
    const user = localStorage.getItem('user')

    if (user) {
        auth = JSON.parse(user)
    }

    useEffect(() => {
        const filmsHndle = async () => {
            let arrayDataFilmsJson = []
            try {
                const arrayDataFilms = await Promise.all(auth.films.map(async (file) => {
                    return await fetch(file)
                }));

                arrayDataFilmsJson = await Promise.all(arrayDataFilms.map(async (file) => {
                    return await file.json()
                }));

            } catch (error) {
                return false
            }
            setReady(true)
            setFilms(arrayDataFilmsJson)
        }

        filmsHndle()
    }, [])

    const toDetail = (item) => {
        console.log("item ==>", item);

        const filmItemList = JSON.parse(localStorage.getItem("film-detail") || "[]");
        filmItemList.push(item)

        localStorage.setItem('film-detail', JSON.stringify(filmItemList));

        navigate("/film-detail", {
            state: {
                film: item,
            },
        });
    }

    const date = new Date(auth.created);
    const result = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "-" + date.toLocaleTimeString();

    return (
        <div className="row g-0 auth-wrapper">
            <NavBar oldUrl={'/'} />
            <section id="contact-us" className="aios-scroll-section" data-aios-scroll-title="Contact US">
                <div className="row mx-3 gap-3 justify-content-center">
                    <div className="col-md-6" style={{ textAlign: 'center' }}>
                        <div className="section-title-contact mb-5" style={{ justifyContent: 'center' }}>
                            <h2>{auth.name} | {result}</h2>
                        </div>
                        <div className="mb-4">
                            {
                                ready ? (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Titulo</th>
                                                <th>Director</th>
                                                <th>Descripcion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                films.length > 0 && (
                                                    films.map((item, i) => {
                                                        return (
                                                            <tr key={i} onClick={() => toDetail(item)} style={{ cursor: 'pointer' }}>
                                                                <td>{i}</td>
                                                                <td>{item.title}</td>
                                                                <td>{item.director}</td>
                                                                <td>{item.opening_crawl}</td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                ) : (
                                    <div className="sp sp-3balls"></div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserList;