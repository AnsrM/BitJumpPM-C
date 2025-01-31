import auth from "@/store/modules/auth";
import { Delete, Get, Post } from "@/web/transport";

function getProjList(type) {
    new Get()
        .url("project", "list")
        .query("type", type).addQuery()
        .sendWith((resData) => {
            // TODO: to use these data
            return resData // transClasses.BriefProject
        })
}
function createNewProject(projName, projUrl, projIntro) {
    new Post()
        .url("project", "create")
        .bodyObject({
            projectName: projName,
            projectUrl: projUrl,
            introduction: projIntro
        })
        .send()
}
function applyCreatePerm(description) {
    new Post()
        .url("project", "apply")
        .bodyObject({
            userId: String(auth.getters.userId()),
            description: description
        })
        .send()
}
function deleteProject(proid) {
    new Delete()
        .url("project", String(proid))
        .bodyObject(null)
        .send()
}
export {getProjList, createNewProject, applyCreatePerm, deleteProject}

function getProjInfo(proid, order=null) {
    let getMethod = new Get()
    getMethod.url("project", String(proid))
    if (order) {
        getMethod.query("order", order)
    }
    getMethod.addQuery()
    getMethod.sendWith((resData) => {
            // TODO: to use these data
            return resData // transClasses.Project
        })
}
function getProjMember(proid,
    pageNum=null, pageSize=null, name=null,
    project=null, post=null) {
        let getMethod = new Get()
        getMethod
            .url("project", String(proid))
            .url("user", "list")
        if (pageNum) {
            getMethod.query("pageNum", pageNum)
        }
        if (pageSize) {
            getMethod.query("pageSize", pageSize)
        }
        if (name) {
            getMethod.query("name", name)
        }
        if (project) {
            getMethod.query("project", project)
        }
        if (post) {
            getMethod.query("post", post)
        }
        getMethod.addQuery()
        getMethod.sendWith((resData) => {
            // TODO: to use these data
            return resData//transClasses.BriefMember
        })
}
export { getProjInfo, getProjMember }