import React, {createRef} from "react";
import {NavLink} from "react-router-dom";
import {cmsPath, host} from "../config";

const Tr = (props)=>{
    return <tr>
        <th scope="row">{props.index}</th>
        <td>{props.name_rus}</td>
        <td>{props.name}</td>
        <td><NavLink to={"editBranch/"+props.branchId}><i className="fas fa-pen"></i> редактировать</NavLink></td>
    </tr>
}

export class Branches extends React.Component{
    constructor() {
        super();
        this.state = {
            branches : []
        }
    }
    componentDidMount() {
        fetch(host+"getBranchesJSON")
            .then(response=>response.json())
            .then(branches=>{
                this.setState({
                    branches: branches.map((branch,index)=>{
                        return <Tr key={index} index={index+1} branchId={branch.id} name={branch.name} name_rus={branch.name_rus}/>
                    })
                })

            })
    }

    render() {
        return <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Адрес</th>
                    <th scope="col">Управление</th>
                </tr>
                </thead>
                <tbody>
                {this.state.branches}
                </tbody>
            </table>

            <NavLink className="btn btn-primary" to="addBranch"><i className="fas fa-plus-square"></i> Добавить раздел сайта</NavLink>
        </div>
    }
}
