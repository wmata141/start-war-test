import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Table } from 'reactstrap'
import BarChart from '../components/BarChart'
import NavBar from '../components/NavBar'

const UserList = () => {
    const [personajes, setPersonajes] = useState([]);
    const [ready, setReady] = useState(false);

    let auth = useSelector(state => state.authReducer)
    const user = localStorage.getItem('user')
    const filmItemList = JSON.parse(localStorage.getItem("film-detail") || "[]");
    console.log("filmItemList ==>", filmItemList);

    if (user) {
        auth = JSON.parse(user)
    }

    const { state } = useLocation();

    useEffect(() => {
        const filmsHndle = async () => {
            let arrayDataFilmsJsonHomeWorld = []
            try {
                const arrayDataFilms = await Promise.all(state.film.characters.map(async (file) => {
                    return await fetch(file)
                }));

                const arrayDataFilmsJson = await Promise.all(arrayDataFilms.map(async (file) => {
                    return await file.json()
                }));

                arrayDataFilmsJsonHomeWorld = await Promise.all(arrayDataFilmsJson.map(async (file) => {
                    let obj = file
                    const data = await fetch(file.homeworld)
                    const result = await data.json()
                    obj.homeworld = result.name

                    return obj
                }));

            } catch (error) {
                console.log("error ==>", error);
                return false
            }
            setReady(true)
            setPersonajes(arrayDataFilmsJsonHomeWorld)
        }

        filmsHndle()
    }, [])

    let grupos = {}
    filmItemList.forEach(film => {
        const nombreGrupo = film.title
        if (!grupos[nombreGrupo]) grupos[nombreGrupo] = []
        grupos[nombreGrupo].push(film)
    })    
    const labels = Object.keys(grupos)

    let data = []
    for (let clave in grupos) {
        data.push(grupos[clave].length);
    }

    return (
        <div className="row g-0 auth-wrapper">
            <NavBar oldUrl={'/user-list'}/>
            <section id="contact-us" className="aios-scroll-section" data-aios-scroll-title="Contact US">
                <div className="row mx-3 gap-3 justify-content-center">
                    <div className="col-md-6" style={{ textAlign: 'center' }}>
                        <div className="section-title-contact mb-2" style={{ fontWeight: 'bold' }}>
                            {state.film.title}
                        </div>
                        <div className="section-title-contact mb-2">
                            {state.film.producer}
                        </div>
                        <div className="section-title-contact mb-2">
                            {state.film.opening_crawl}
                        </div>
                        
                        <div className="mb-4">
                            {
                                ready ? (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Mundo</th>
                                                <th>Color de Cabello</th>
                                                <th>Estatura</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                personajes.length > 0 && (
                                                    personajes.map((item, i) => {
                                                        return (
                                                            <tr key={i} >
                                                                <td>{i}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.homeworld}</td>
                                                                <td>{item.hair_color}</td>
                                                                <td>{item.height}</td>
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

                        <BarChart labels={labels} data={data} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserList;