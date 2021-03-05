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

import { getEmailFromJwt, getJwt } from "../../utils/Cognito/index.js";

import jwtDecode from "jwt-decode";

import {
  getApplication,
  submitApplication,
  sendEmails,
  emailTemplates,
} from "../../utils/API/index.js";
import { useParams } from "react-router-dom";

export default class ApplicationView extends Component {
    constructor(props) {
        super(props);
        var jwt = getJwt();
        console.log(jwtDecode(jwt));
        
        // handle users who are not logged in
        if (!jwt) {
            this.props.history.push({
                pathname: "/login",
            });
        }
        // handle users who are not execs
        if (getRoleFromJwt() != "exec") {
            this.props.history.push({
              pathname: "/dashboard",
            });
        }
    }
        
    componentDidMount = () => {
        const url_split = (window.location.href).split("application/");
        const id = url_split[1];
        console.log(id);
        console.log(getEmailFromJwt());
        getApplication(
            id,
            (data) => {
            if (data) {
                console.log('in data');
                this.setState({
                submitted: data.submitted,
                phone_number: data.phone_number,
                birth_date: data.birth_date,
                gender: data.gender,
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
    };
    

    render() {
        return (
            <div>
                Hello World
            </div>
        )
    }

};