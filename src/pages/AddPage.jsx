import React, {createRef} from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "emmet-core"
import "ace-builds/src-noconflict/ext-emmet"
import {cmsPath, host} from "../config";
import {Redirect} from "react-router-dom";

const Option = (props)=>{
    return <option value={props.id}>{props.name_rus}</option>
}

export class AddPage extends React.Component {
    constructor() {
        super();
        this.htmlEditor = createRef();
        this.cssEditor = createRef();
        this.jsEditor = createRef();
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            referrer: null,
            name: "",
            title: "",
            options:[],
            branch: 1
        }
    }

    handleSave(){
        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('title', this.state.title);
        formData.append('html',this.htmlEditor.current.editor.getValue());
        formData.append('css',this.cssEditor.current.editor.getValue());
        formData.append('js',this.jsEditor.current.editor.getValue());
        formData.append('branch',this.state.branch);

        fetch(host+"addPage",{
            method: 'POST',
            body: formData
        })
            .then(response=>response.json())
            .then(res=> {
                this.setState({
                        referrer: "/pages/"
                    }
                )
            });
    }

    componentDidMount() {
        fetch(host+"getBranchesJSON")
            .then(response=>response.json())
            .then(branches=>{
                this.setState({
                    options: branches.map((branch,index)=><Option key={index} id={branch.id} name_rus={branch.name_rus}/>)
                })

            })
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
        if (referrer) return <Redirect to={cmsPath+referrer}/>
        return<div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-link active" id="nav-html-tab" data-toggle="tab" href="#nav-html" role="tab"
                       aria-controls="nav-html" aria-selected="true"><i className="fab fa-html5"></i> HTML</a>
                    <a className="nav-link" id="nav-css-tab" data-toggle="tab" href="#nav-css" role="tab"
                       aria-controls="nav-css" aria-selected="false"><i className="fab fa-css3-alt"></i> CSS</a>
                    <a className="nav-link" id="nav-js-tab" data-toggle="tab" href="#nav-js" role="tab"
                       aria-controls="nav-js" aria-selected="false"><i className="fab fa-js-square"></i> JS</a>
                    <a className="nav-link" id="nav-extraHTML-tab" data-toggle="tab" href="#nav-extraHTML" role="tab"
                       aria-controls="nav-extraHTML" aria-selected="false"><i className="fas fa-bars"></i> Параметры</a>
                    <button onClick={this.handleSave} className="btn btn-light ml-auto"><i className="fas fa-save"></i> сохранить</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-html" role="tabpanel" aria-labelledby="nav-html-tab">
                    <AceEditor
                        mode="html"
                        width="100%"
                        theme="vibrant_ink"
                        ref={this.htmlEditor}
                        setOptions={{
                            fontSize:18,
                            enableEmmet:true
                        }}
                    />
                </div>
                <div className="tab-pane fade" id="nav-css" role="tabpanel" aria-labelledby="nav-css-tab">
                    <AceEditor
                        mode="css"
                        width="100%"
                        theme="vibrant_ink"
                        ref={this.cssEditor}
                        setOptions={{
                            fontSize:18,
                            enableEmmet:true
                        }}
                    />
                </div>
                <div className="tab-pane fade" id="nav-js" role="tabpanel" aria-labelledby="nav-js-tab">
                    <AceEditor
                        mode="javascript"
                        width="100%"
                        theme="vibrant_ink"
                        ref={this.jsEditor}
                        setOptions={{
                            fontSize:18,
                            enableEmmet:true
                        }}
                    />
                </div>
                <div className="tab-pane fade" id="nav-extraHTML" role="tabpanel" aria-labelledby="nav-extraHTML-tab">
                    <div className="col-10 mx-auto my-3">
                        <div className="mb-3">
                            <input name="name" onChange={this.handleInputChange} type="text" className="form-control" placeholder="URI страницы"/>
                        </div>
                        <div className="mb-3">
                            <input name="title" onChange={this.handleInputChange} type="text" className="form-control" placeholder="Заголовок страницы"/>
                        </div>
                        <div className="mb-3">
                            <select name="branch" onChange={this.handleInputChange} className="form-control">
                                {this.state.options}
                            </select>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    }
}