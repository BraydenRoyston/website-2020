import React, { Component } from "react";

import {
    schools,
    majors,
    ethnicity,
    degrees,
    genders,
    coopTerms,
    studyYears,
    howHeard,
    numHackathons,
    streams,
  } from "../../assets/data";

import { getEmailFromJwt, getJwt, getRoleFromJwt } from "../../utils/Cognito/index.js";

import styles from "./styles.module.css";

import jwtDecode from "jwt-decode";

import {
  getApplication,
  submitApplication,
  sendEmails,
  emailTemplates,
} from "../../utils/API/index.js";
import { useParams } from "react-router-dom";

export default class ApplicationViewPage extends Component {
    constructor(props) {
        super(props);
        var jwt = getJwt();
        console.log(jwtDecode(jwt));

        this.state = {
            err: false,
            errMessage: "",
            id: "",
        };
        
        // handle users who are not logged in
        if (!jwt) {
            this.props.history.push({
                pathname: "/login",
            });
        }
        // handle users who are not execs
        // if (getRoleFromJwt() != "exec") {
        //     this.props.history.push({
        //       pathname: "/dashboard",
        //     });
        // }
    }
    componentDidMount = () => {
        const url_split = (window.location.href).split("application/");
        const id = url_split[1];
        this.setState({
            id: id,
        });
        getApplication(
            id,
            (data) => {
            if (data) {
                console.log('in data');
                console.log(data);
                this.setState({
                first_name: data.first_name,
                last_name: data.last_name,
                submitted: data.submitted,
                phone_number: data.phone_number,
                birth_date: data.birth_date,
                gender: data.Gender,
                degree: data.degree,
                study_year: data.study_year,
                github_url: data.github_url,
                linkedin_url: data.linkedin_url,
                dribbble_url: data.dribbble_url,
                personal_url: data.personal_url,
                link_to_resume: data.link_to_resume,
                num_hackathons: data.num_hackathons,
                why_goldenhack: data.why_goldenhack,
                how_heard: data.how_heard,
                
                // if this field doesn't exist in the application then set it to an
                // empty array instead of just null
                school: data.school ?? [],
                ethnicity: data.ethnicity ?? [],
                program: data.program ?? [],
                coop_terms: data.coop_terms ?? [],
                streams: data.streams ?? [],
    
                loadComplete: true,
                });
            }
            },
            // If there was an error then there was no application in the db
            // so just initiate the
            () => {
                console.log('in else');
                this.setState({
                    phone_number: "",
                    birth_date: "",
                    gender: "",
                    ethnicity: [],
                    streams: [],
                    school: [],
                    degree: "",
                    study_year: "",
                    coop_terms: [],
                    program: [],
                    github_url: "",
                    linkedin_url: "",
                    dribbble_url: "",
                    personal_url: "",
                    link_to_resume: "",
                    num_hackathons: "",
                    how_heard: "",
                    why_goldenhack: "",
                    loadComplete: true,
                });
            }
        );
        console.log(this.state.study_year);
    };
    

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <p>Querying for application id: {this.state.id}</p>
                </div>
                <div className={styles.innerContainer}>
                    <div className={styles.dataCard}>
                        <p>Name: {this.state.first_name} {this.state.last_name}</p>
                        <p>Gender: {this.state.gender}</p>
                        <p>Birth Date: {this.state.birth_date}</p>
                        <p>Ethnicity: {this.state.ethnicity}</p>
                        <p>Number of Past Hackathons: {this.state.num_hackathons}</p>
                    </div>
                    <div className={styles.dataCard}>
                        <p>School: {this.state.school}</p>
                        <p>Study Year: {this.state.study_year}</p>
                        <p>Degree: {this.state.degree}</p>
                        <p>Next Co-op Term: {this.state.coop_terms}</p>
                    </div>

                    <div className={styles.dataCard}>
                        <p>Resume: {this.state.link_to_resume}</p>
                        <p>Github: {this.state.github_url}</p>
                        <p>Personal: {this.state.personal_url}</p>
                        <p>Dribble: {this.state.dribbble_url}</p>
                    </div>
                    <div className={styles.dataCard}>
                        <p>RSVP Status: {this.state.school}</p>
                        <p>Resume: {this.state.link_to_resume}</p>
                        <p>Job Search Goal: {this.state.study_year}</p>
                        <p>Shirt size: {this.state.degree}</p>
                        <p>Dietary Restrictions: {this.state.link_to_resume}</p>
                    </div>
                </div>
                <div className={styles.dataCard}>
                    <p>Question 1</p>
                    <p></p>
                    <p>Question 2</p>
                    <p></p>
                    <p>Question 3</p>
                    <p></p>
                </div>
            </div>
            


        )
    }

};