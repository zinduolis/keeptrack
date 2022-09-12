import React, { useState } from 'react';
import Project from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
    projects: Project[];
    onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});
    const cancelEditing = () => {
        setProjectBeingEdited({});
    }
    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project);
    };
    const items = projects.map(project => (
        <div key={project.id} className="cols-sm">
            {projectBeingEdited === project ? (
                <ProjectForm 
                    project={project}
                    onCancel={cancelEditing}
                    onSave={onSave}
                />
            ) : ( 
                <ProjectCard project={project} onEdit={handleEdit}></ProjectCard>
            )
            }           
        </div>
    ) )
    return <div className="row">{items}</div>
}

export default ProjectList;