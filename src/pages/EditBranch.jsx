import React, {createRef} from "react";
import {host} from "../config";
import {Redirect} from "react-router-dom";


export class EditBranch extends React.Component{
    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            referrer: null,
            name: "",
            name_rus: "",
            branchId: ""
        }
    }
    componentDidMount() {
        const uri = window.location.pathname.split("/");
        const branchId = uri[uri.length-1];
        this.setState({branchId:branchId})
        let formData = new FormData();
        formData.append('branchId',branchId);
        fetch(host+"getBranchByIdJSON",{
            method: 'POST',
            body: formData
        }).then(response=>response.json())
            .then(branch=>{
                this.setState({
                    name: branch.name,
                    name_rus: branch.name_rus
                })
            })

    }
    handleSave(){
        let formData = new FormData();
        formData.append('branchId',this.state.branchId);
        formData.append('name',this.state.name);
        formData.append('name_rus',this.state.name_rus);
        fetch(host+"editBranchById",{
            method: 'POST',
            body: formData
        })
            .then(response=>response.json())
            .then(res=>{
                this.setState({
                    referrer:"/branches/" }
                )
            });
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }
    render() {
        const referrer = this.state.referrer;
        if (referrer) return <Redirect to={referrer}/>
        return <div>
            <h2 className="my-4 text-center">Добавить раздел сайта</h2>
            <div className="mb-3">
                <input name="name" value={this.state.name} onChange={this.handleInputChange} type="text" className="form-control" placeholder="URI"/>
            </div>
            <div className="mb-3">
                <input name="name_rus" value={this.state.name_rus} onChange={this.handleInputChange} type="text" className="form-control" placeholder="Name_RUS"/>
            </div>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={this.handleSave}>Изменить</button>
            </div>
        </div>
    }
}