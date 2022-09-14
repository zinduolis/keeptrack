import React, { Fragment, useEffect, useState } from 'react';
// import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';
import Project from './Project';
import { projectAPI } from './projectAPI';

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    }

    useEffect(() => {
        // setLoading(true);
        // projectAPI.get(1)
        //     .then(setProjects)
        //     .then(() => {
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         setError(error);
        //         setLoading(false);
        //     });
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                setError('');
                if (currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((projects) => [...projects, ...data]);
                }

            }
            catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage])


    const saveProject = (project: Project) => {
        projectAPI
            .put(project)
            .then((updatedProject) => {
                let updatedProjects = projects.map((p: Project) => {
                    return p.id === project.id ? new Project(updatedProject) : p;             
                });
                setProjects(updatedProjects);
            } )
            .catch((e) => {
                if (e instanceof Error) {
                    setError(e.message);
                }
            });
    };
    return (
        <Fragment>
            <h1>Projects</h1> 
            {error && (
                <div className="row">
                    <div className='card large error'>
                        <section>
                            <p>
                                <span className='icon-alert inverse '></span>
                                {error}
                            </p>
                        </section>
                    </div>

                </div>
            )}      
            <ProjectList 
                projects={projects} 
                onSave={saveProject} />
            {!loading && !error && (
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='button-group fluid'>
                            <button className='button default' onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {loading && (
            <div className="center-page">
                <span className="spinner primary"></span>
                 <p>Loading...</p>
            </div>
            )}
        </Fragment>
    );  
}

export default ProjectsPage;
