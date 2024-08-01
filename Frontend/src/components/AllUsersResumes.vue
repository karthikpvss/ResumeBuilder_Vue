<template>
    <div>
        <v-row class="text-right"> 
            <v-col col="12" mb="2">
                <v-btn
                prepend-icon="mdi-account-circle"
                @click="refreshResumes = !refreshResumes"
                >
                <template v-slot:prepend>
                    <v-icon color="#711429">mdi-refresh</v-icon>
                </template>
                    Refresh
                </v-btn>
            </v-col>
        </v-row>

        <v-list v-show="this.users.length > 0">
            <v-list-group no-action v-for='user in users' :key="user.id">
                <template v-slot:activator="{ props }">
                    <v-list-item slot='activator' v-bind="props">
                        <v-list-item-title>{{ user.fullname }}</v-list-item-title>
                    </v-list-item>
                </template>

                    <v-divider color="#fff"></v-divider>

                    <v-list-group no-action v-for='resume in user.resumes' :key="user.id">
                    <template v-slot:activator="{ props }">
                        <v-list-item slot='activator' v-bind="props">
                            <v-list-item-title>{{ resume.resumeTitle }}</v-list-item-title>
                        </v-list-item>
                    </template>

                    <v-list-item
                        v-for="ver in resume.resumeVersions"
                        :key="ver.version"
                        :title= setVersion(ver.version)
                        prepend-icon="mdi-arrow-right"
                    >
                        <template v-slot:append>
                        <v-btn size="small" variant="tonal" @click="openResumeOverlay(ver)">
                            <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                            Open
                        </v-btn>
                        &nbsp;
                        </template>
                        <v-divider color="#fff"></v-divider>
                    </v-list-item>
                </v-list-group>
            </v-list-group>
        </v-list>
        <h1 v-show="this.users.length < 1">No Users to show.</h1>
    </div>
    
    <v-overlay
      :model-value="loadingOverlay"
      class="align-center justify-center"
      :persistent="diableOverlay"
    >
        <v-progress-circular
            color="#711429"
            indeterminate
            size="64"                             
            class="align-center"
        ></v-progress-circular>
        <h3>{{loadingMSG}}</h3>
    </v-overlay>

    <v-overlay
      :model-value="resumeOverlay"
      class="align-center justify-center"
      persistent
    >
    <v-container fluid fill-height class='d-flex flex-column'>
      <v-row width="1200px" class='flex-grow-0'>
        <v-card class="mx-auto px-10 py-5" width="1100px" height="50px" color="#711429">
        <v-row>
                <v-btn
                    @click="editResume"
                    color="#121212"
                >
                    Edit    
                </v-btn>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn
                    @click="exportToPDF"
                    color="#121212"
                >
                    Download
                </v-btn>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn
                    @click="deleteResumeVersion(resumeDetails.id)"
                    color="#121212"
                >
                    Delete
                </v-btn>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn
                    @click="this.resumeOverlay = !this.resumeOverlay"
                    color="#121212"
                >
                    close
                </v-btn>
        </v-row>
      <br/>
      </v-card>
    </v-row>

      <v-row width="1200px" class='flex-grow-0'>
        <v-col py="0" px="0">
          <v-card flat v-if="tempalte == 'Template 1' && showTemplate" width="700px" color="#fff">
          <v-infinite-scroll
              height="700"
              mode="manual"
          >
        <vue-html2pdf
        :show-layout="false"
        :preview-modal="true"
        :paginate-elements-by-height="10"
        :pdf-quality="2"
        pdf-format="a4"
        :ref="ref"
        id= "template1ResumePDF"
        >
                  <section class="pdf-item">
                    <v-card class="mx-auto px-10 py-8 overflow-y-auto" color="#fff">
                      <div style="text-align:center;">
                        <h2>{{ resumeDetails.fullName }}</h2>
                        <p>{{ resumeDetails.location }} | {{ resumeDetails.phoneNumber }} | {{ resumeDetails.email }} | {{ linkedinURL }} / {{ websiteURL }}</p>
                      </div>

                      <div>
                        <br/>
                        <h3>PROFESSIONAL SUMMARY</h3>
                        <hr/>
                        <p>
                          {{ resumeDetails.professionalSummary }}
                        </p>
                      </div>

                      <div>
                        <br/>
                        <h3>EDUCATION</h3>
                        <hr/>
                        <div v-for="edu in resumeDetails.EducationDetails">
                          <br/>
                          <v-row class="px-3">
                            <p style="font-size:16px;">
                              <b>{{ edu.instituteName }}, {{ edu.location }} </b>
                            </p>
                            <v-spacer></v-spacer>
                            <p style="font-size:14px;">
                              {{ edu.startDate }} - {{ edu.endDate }}
                            </p>
                          </v-row>
                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <div style="font-size:14px;">
                            <p>{{ edu.degree }}</p>
                            <p>GPA: {{ edu.gpa }}</p>
                            <p>Awards: {{ formatcomma(edu.Awards) }}</p>
                            <p>Courses: {{ formatcomma(edu.Courses) }}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <br/>
                        <h3>PROFESSIONAL EXPERIENCE</h3>
                        <hr/>
                        <div v-for="experience in resumeDetails.ExperienceDetails">
                          <br/>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">
                              <b>{{ experience.orgName }}, {{ experience.roleName }}, {{ experience.location }} </b>
                            </p>
                            <v-spacer></v-spacer>
                            <p>
                              Date ({{ experience.startDate }} - {{ experience.endDate }})
                            </p>
                          </v-row>
                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <div style="font-size:14px;">
                            <p v-for="note in experience.ExperienceNotes">●	{{ note.description }}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <br/>
                        <h3>SKILLS | LEADERSHIP SKILLS | ACTIVITIES | EXTRACURRICULAR ACTIVITIES</h3>
                        <hr/>
                        <p v-for="skill in resumeDetails.Skills">●	{{ skill.Name }} : {{ skill.level }}</p>

                      </div>
                    </v-card>
            </section>
        </vue-html2pdf>
    </v-infinite-scroll>
          </v-card>

          <v-card flat v-if="tempalte == 'Template 2' && showTemplate" width="700px" color="#fff">
            <v-infinite-scroll
                  height="700"
                  mode="manual"
              >
            <vue-html2pdf
            :show-layout="false"
            :preview-modal="true"
            :paginate-elements-by-height="10"
            :pdf-quality="2"
            pdf-format="a4"
            :ref="ref"
            id= "template2ResumePDF"
          >
                  <section class="pdf-item">
                    <v-card class="mx-auto px-10 py-8 overflow-y-auto" color="#fff">
                      <div>
                        <h2>{{ resumeDetails.fullName }}</h2>
                        <p>{{ resumeDetails.location }} | {{ resumeDetails.phoneNumber }} | {{ resumeDetails.email }} | {{ linkedinURL }}/{{ websiteURL }}</p>
                      </div>

                      <div>
                        <br/>
                        <h3>PROFESSIONAL SUMMARY</h3>
                        <p>
                          {{ resumeDetails.professionalSummary }}
                        </p>
                      </div>

                      <div>
                        <br/>
                        <h3>EDUCATION</h3>
                        <div v-for="edu in resumeDetails.EducationDetails">
                          <br/>
                          <v-row class="px-3">
                            <p style="font-size:16px;">
                              <b>{{ edu.instituteName }}, {{ edu.location }} </b> | {{ edu.startDate }} - {{ edu.endDate }}
                            </p>
                          </v-row>
                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <div style="font-size:14px;">
                            <p>{{ edu.degree }}</p>
                            <p>GPA: {{ edu.gpa }}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <br/>
                        <h3>EXPERIENCE</h3>
                        <div v-for="experience in resumeDetails.ExperienceDetails">
                          <br/>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">
                              <b>{{ experience.roleName }}, {{ experience.orgName }}</b> | {{ experience.startDate }} - {{ experience.endDate }}
                            </p>
                          </v-row>
                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <div style="font-size:14px;">
                            <p v-for="note in experience.ExperienceNotes">●	{{ note.description }}</p>
                          </div>
                        </div>
                      </div>
                    </v-card>
            </section>
        </vue-html2pdf>
    </v-infinite-scroll>
          </v-card>

          <v-card flat v-if="tempalte == 'Template 3' && showTemplate" width="700px" color="#fff">
            <v-infinite-scroll
                height="700"
                mode="manual"
            >
            <vue-html2pdf
            :show-layout="false"
            :preview-modal="true"
            :paginate-elements-by-height="10"
            :pdf-quality="2"
            pdf-format="a4"
            :ref="ref"
            id= "template3ResumePDF"
          >
                  <section class="pdf-item">
                    <v-card class="mx-auto px-10 py-8 overflow-y-auto" color="#fff">
                      <div style="text-align:center;">
                        <h2>{{ resumeDetails.fullName }}</h2>
                        <p>{{ resumeDetails.location }} | {{ resumeDetails.phoneNumber }} | {{ resumeDetails.email }} | {{ linkedinURL }}/{{ websiteURL }}</p>
                        <hr/>
                      </div>

                      <div>
                        <br/>
                        <p>
                          {{ resumeDetails.professionalSummary }}
                        </p>
                      </div>

                      <div>
                        <br/>
                        <h3>EDUCATION</h3>
                        <hr/>
                        <div v-for="edu in resumeDetails.EducationDetails">
                          <br/>
                          <v-row class="px-3">
                            <p style="font-size:16px;">
                              <b>{{ edu.instituteName }}, {{ edu.location }} </b>
                            </p>
                            <v-spacer></v-spacer>
                            <p style="font-size:14px;">
                              {{ edu.startDate }} - {{ edu.endDate }}
                            </p>
                          </v-row>
                          <br/>
                          <v-row class="px-3">
                            <p style="font-size:14px;">{{ edu.degree }}</p>
                            <v-spacer></v-spacer>
                            <p style="font-size:14px;">GPA: {{ edu.gpa }}</p>
                          </v-row>
                        </div>
                      </div>

                      <div>
                        <br/>
                        <h3>EXPERIENCE</h3>
                        <hr/>
                        <div v-for="experience in resumeDetails.ExperienceDetails">
                          <br/>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">
                              <b>{{ experience.orgName }}, {{ experience.location }} </b>
                            </p>
                            <v-spacer></v-spacer>
                            <p>
                              {{ experience.startDate }} - {{ experience.endDate }}
                            </p>
                          </v-row>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">{{ experience.roleName }}</p>
                          </v-row>

                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <div style="font-size:14px;">
                            <p v-for="note in experience.ExperienceNotes">●	{{ note.description }}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <br/>
                        <h3>PROJECTS</h3>
                        <hr/>
                        <div v-for="project in resumeDetails.ProjectDetails">
                          <br/>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">
                              <b>{{ project.orgName }}, {{ project.location }} </b>
                            </p>
                            <v-spacer></v-spacer>
                            <p>
                              {{ project.startDate }} - {{ project.endDate }}
                            </p>
                          </v-row>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">{{ project.projectName }}</p>
                          </v-row>

                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <div style="font-size:14px;">
                            <p v-for="note in project.ProjectNotes">●	{{ note.description }}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <br/>
                        <h3>SKILLS</h3>
                        <hr/>
                        <p>{{ formatSkills(resumeDetails.Skills) }}</p>
                      </div>
                    </v-card>
            </section>
        </vue-html2pdf>
    </v-infinite-scroll>
          </v-card>

          <v-card flat v-if="tempalte == 'Template 4' && showTemplate" width="700px" height="auto" color="#fff">
          <v-infinite-scroll
                height="700"
                mode="manual"
            >
            <vue-html2pdf
                :show-layout="false"
                :preview-modal="true"
                :paginate-elements-by-height="100"
                :pdf-quality="2"
                pdf-format="a4"
                :ref="ref"
                id= "template4ResumePDF"
            >
            
                <section class="pdf-item">
                    <v-card class="mx-auto px-10 py-8 overflow-y-auto" color="#fff">
                      <div style="text-align:center;">
                        <h2>{{ resumeDetails.fullName }}</h2>
                        <p>{{ resumeDetails.location }} ♦ {{ resumeDetails.phoneNumber }} ♦ {{ resumeDetails.email }} ♦ {{ linkedinURL }} or {{ websiteURL }}</p>
                      </div>

                      <div>
                        <br/>
                        <h3>OBJECTIVE</h3>
                        <p>
                          {{ resumeDetails.professionalSummary }}
                        </p>
                      </div>

                      <div>
                        <br/>
                        <h3>EDUCATION</h3>
                        <div v-for="edu in resumeDetails.EducationDetails">
                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <v-row class="px-3">
                            <p style="font-size:16px;">
                              <b>{{ edu.instituteName }}, {{ edu.location }} </b>
                            </p>
                            <v-spacer></v-spacer>
                            <p style="font-size:14px;">
                              {{ edu.startDate }} - {{ edu.endDate }}
                            </p>
                          </v-row>
                          <br/>
                          <v-row class="px-3">
                            <p style="font-size:14px;">{{ edu.degree }}</p>
                          </v-row>
                          <v-row class="px-3">
                            <p style="font-size:14px;">Cumulative GPR: {{ edu.gpa }}</p>
                          </v-row>
                          <v-row class="px-3">
                            <p>Coursework: {{ edu.Courses.toString() }}</p>
                          </v-row>
                        <br/>
                      </div>
                      </div>

                      <div>
                        <br/>
                        <h3>LEADERSHIP (or WORK EXPERIENCE, ACTIVITIES, VOLUNTEER WORK)</h3>
                        <div v-for="leadership in resumeDetails.Leaderships">
                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">
                              <b>{{ leadership.orgName }}</b>
                            </p>
                            <v-spacer></v-spacer>
                            <p>
                              {{ leadership.startDate }} - {{ leadership.endDate }}
                            </p>
                          </v-row>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">{{ leadership.leadershipPosition }}</p>
                          </v-row>

                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <div style="font-size:14px;">
                            <p v-for="note in leadership.LeadershipNotes">●	{{ note.description }}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <br/>
                        <h3>WORK EXPERIENCE (or LEADERSHIP, ACTIVITIES, VOLUNTEER WORK)</h3>
                        <div v-for="experience in resumeDetails.ExperienceDetails">
                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">
                              <b>{{ experience.orgName }}, {{ experience.location }} </b>
                            </p>
                            <v-spacer></v-spacer>
                            <p>
                              {{ experience.startDate }} - {{ experience.endDate }}
                            </p>
                          </v-row>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">{{ experience.roleName }}</p>
                          </v-row>

                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <div style="font-size:14px;">
                            <p v-for="note in experience.ExperienceNotes">●	{{ note.description }}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <br/>
                        <h3>HONORS (and/or AWARDS)</h3>
                        <div v-for="honor in resumeDetails.Honors">
                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <v-row class="px-3">
                            <p  style="font-size:16px;">
                              <b>{{ honor.name }}/{{ honor.honorOrg }} </b>
                            </p>
                            <v-spacer></v-spacer>
                            <p>
                              {{ honor.startDate }} - {{ honor.endDate }}
                            </p>
                          </v-row>
                          <br style="line-height:0px;margin: 6px 0;display: block;"/>
                          <div style="font-size:14px;">
                            <p v-for="note in honor.HonorNotes">●	{{ note.description }}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <br/>
                        <h3>SKILLS</h3>
                        <p v-for="skill in resumeDetails.Skills">●	{{ skill.Name }} : {{ skill.level }}</p>
                      </div>

                    </v-card>
                </section>
            </vue-html2pdf>
        </v-infinite-scroll>
          </v-card>
      </v-col>

      <v-col class="justify-center" py="0"  px="0">
          <v-card width="380px" class="justify-center">
            <br/>
            <div class="text-center">
              <h4>Match Score:</h4>
              <h1>{{resumeDetails.matchScore}}</h1>
            </div>
            <br/>
          </v-card>
          <br style="line-height:0px;margin: 6px 0;display: block;"/>

          <v-card width="380px" >
            <br/>
            <div class="text-center">
              <h4>Comments:</h4>
            </div>
            <br/>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-overlay>
</template>
  
  <script>
  import ResumeService from '@/services/ResumeService'
  import html2pdf from "html2pdf.js";
  import router from '../router'

    export default {
        data: () => ({
            users: [
            {
                id: 1,
                fullname: "Walter White",
                resumes: [{
                    id:1,
                    resumeTitle: "MyResume",
                    resumeVersions: [{
                        id: 1,
                        version: 1,
                        resumeTitle: "Myresume"
                    },{
                        id: 2,
                        version: 2,
                        resumeTitle: "Myresume"
                    }]
                },
                {
                    id:2,
                    resumeTitle: "MyResume2",
                    resumeVersions: [{
                        id: 3,
                        version: 1,
                        resumeTitle: "Myresume2"
                    },{
                        id: 4,
                        version: 2,
                        resumeTitle: "Myresume2"
                    }]
                }]
            },
            {
                id: 2,
                fullname: "Jamie Jonk",
                resumes: [{
                    id:3,
                    resumeTitle: "MyResumeQ",
                    resumeVersions: [{
                        id: 5,
                        version: 1,
                        resumeTitle: "MyresumeQ"
                    },{
                        id: 6,
                        version: 2,
                        resumeTitle: "MyresumeQ"
                    }]
                },
                {
                    id:4,
                    resumeTitle: "MyResume2Q",
                    resumeVersions: [{
                        id: 7,
                        version: 1,
                        resumeTitle: "Myresume2Q"
                    },{
                        id: 8,
                        version: 2,
                        resumeTitle: "Myresume2Q"
                    }]
                }]
            }],
            resumes: [],
            resumeDetails: null,
            resumeOverlay: false,
            refreshResumes: false,
            tempalte: "",
            showTemplate: false,
            linkedinURL: "",
            websiteURL: "",

            loadingOverlay: false,
            loadingMSG: "",
            opt: {
                margin: 0,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            }
        }),
  
        methods: {
            onLoad(){
                this.linkedinURL = sessionStorage.getItem('UserLinkedinURL')
                this.websiteURL = sessionStorage.getItem('UserWebsiteURL')

                this.loadingOverlay = true
                this.getResumes()
            },
            setVersion(version){
                return "Version: " + version
            },
            openResumeOverlay(resume){
                console.log(resume)
                this.resumeDetails = resume
                this.resumeOverlay = !this.resumeOverlay
                this.showTemplate = true
                this.tempalte = resume.templaterType
                this.tempalte = "Template 1"
            },
            closeResumeOverlay(){

            },

            async getResumes() {
                //this.$store.state.isUserLoggedIn
                try{
                    this.setLoadingOverLay(true, "Please wait. While fetching your resumes...")
                    console.log(sessionStorage.getItem("UserId"))
                    await ResumeService.getResumes(sessionStorage.getItem("UserId")).then((response)=> {
                        console.log(response)
                        if(response.statusText == "OK"){
                            this.resumes = response.data
                            console.log("resume length: "+response.data.length)
                        }
                        this.setLoadingOverLay(false, "")
                    })
                }
                catch(err){
                    console.log(err)
                    this.setLoadingOverLay(false, "")
                }
            },
             
            exportToPDF() {
                this.opt.filename = this.resumeDetails.resumeTitle != "" ? this.resumeDetails.resumeTitle + "_V" + this.resumeDetails.version + ".pdf" : "myresume.pdf"
                var currentTemplate = ""
                switch(this.tempalte){
                    case "Template 1": currentTemplate = "template1ResumePDF" 
                    break;
                    case "Template 2": currentTemplate = "template2ResumePDF" 
                    break;
                    case "Template 3": currentTemplate = "template3ResumePDF" 
                    break;
                    case "Template 4": currentTemplate = "template4ResumePDF" 
                    break;
                    default: currentTemplate = "template1ResumePDF" 
                    break; 
                }
                html2pdf().set(this.opt).from(document.getElementById(currentTemplate)).save()
            },
            setLoadingOverLay(isShow, message){
                if(isShow){
                    this.loadingOverlay = true
                    this.loadingMSG = message
                }
                else{
                    this.loadingOverlay = false
                    this.loadingMSG = null
                }
            },

            async deleteResumeVersion(resumeID) {
                try{
                    this.setLoadingOverLay(true, "Please wait. While Deleting...")
                    await ResumeService.deleteResumeVersion(resumeID).then((response)=> {
                        console.log(response)
                        if(response.statusText == "OK"){
                            this.resumeOverlay = !this.resumeOverlay
                            this.refreshResumes = !this.refreshResumes
                        }
                        this.setLoadingOverLay(false, "")
                    })
                }
                catch(err){
                    console.log(err)
                    this.setLoadingOverLay(false, "")
                }
            },
            editResume(){
                this.$store.commit('setResumeDetails', this.resumeDetails )
                router.push('/editresume')
            },
            
            formatSkills(skills){
            var formattedSkills = ""
            skills.forEach(element => {
                if(formattedSkills != ""){
                formattedSkills = formattedSkills + " | " + element.Name
                }
                else{
                formattedSkills = element.Name
                }
            });
            return formattedSkills
            },
            formatcomma(val){
                var formattedVal = ""
                val.forEach(element => {
                    if(formattedVal != ""){
                        formattedVal = formattedVal + " , " + element.description
                    }
                    else{
                        formattedVal = element.description
                    }
                });
                return formattedVal
            }
        },
        beforeMount() {
            //this.onLoad()
        },
        watch: {
            refreshResumes: function(){
                //this.loadingOverlay = true
                //this.resumes = []
                //this.getResumes() 
            }
        }
    }
  </script>