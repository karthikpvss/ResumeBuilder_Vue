import Api from '@/services/Api'

export default{
    saveResume (request) {
        return Api().post('/saveResume', request)
    },
    getResumes (userID){
        return Api().get('/resumes/' + userID)
    },
    saveResumeVersion (request){
        return Api().post('/resumeVersion', request)
    },
    deleteResumeVersion (id){
        return Api().delete('/ResumeVersion/' + id)
    }
}

