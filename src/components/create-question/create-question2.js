


import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import * as usersService from "../../services/users-service";
import * as groupSerivce from "../../services/groups-service"

import {useNavigate} from "react-router-dom";
import * as authService from "../../services/auth-service";
import MemberListNoButton from "../chat/member-list-noButton";


const CreateGroup = () => {

    let navigate = useNavigate()

    const [form, setForm] = useState({
        username: '', date: '', admin: '', groupName: '', description: ''
    })
    const [groupMembers, setGroupMembers] = useState([])
    const [admins, setAdmins] = useState([])

    const [emptyUsernameError, setEmptyUsernameErrors] = useState(false)
    const [createGroupError, setCreateGroupError] = useState(false)
    const [addMemberError, setAddMemberError] = useState(false)
    const [addAdminError, setAddAdminError] = useState(false)
    const [emptyDateError, setEmptyDateErrors] = useState(false)
    const [emptyAdminError, setEmptyAdminErrors] = useState(false)
    const [emptyGroupNameError, setEmptyGroupNameErrors] = useState(false)
    const [failedToAddMember, setFailedToAddMember] = useState(false)
    const [failedToAddAdmin, setFailedToAddAdmin] = useState(false)


    const [sucessfulAddMember, setSucessfulAddMember] = useState(false)
    const [sucessfulAddAdmin, setSucessfullAddAdmin] = useState(false)


    const handleAddAdmin = async () => {

        let found = false
        const currentUser = await authService.profile()

        if (form.admin !== "") {

            let validAdmin = await usersService.findUserByUsername(form.admin)

            if(groupMembers.length === 0){
                setAddAdminError(true)
            }
            else if (groupMembers.length >= 1 && validAdmin._id !== currentUser._id) {


                for (let i = 0; i < groupMembers.length; i++) {
                    if (groupMembers[i] === validAdmin._id) {
                        found = true
                    }
                }

                if (found === true) {
                    if (validAdmin !== null) {
                        setAdmins([...admins, validAdmin._id])
                        setSucessfullAddAdmin(true)
                    } else {
                        setAddAdminError(true)
                    }
                }
            }
        }else {
            setAddAdminError(true)
        }


    }

    const formEmptyEntryHandler = () => {

        let flag = false

        if(form.username.length === 0){
            setEmptyUsernameErrors(true)
            flag = true
        }

        if (form.date.length === 0) {
            setEmptyDateErrors(true)
            flag = true
        }


        if (form.groupName.length === 0) {
            setEmptyGroupNameErrors(true)
            flag = true
        }

        return flag
    }



    const validFormCheckOneEntry = async () => {

        let flag = true
        let users = {}
        let newAdmin = {}

        let found = false
        let found2 = false
        let lengthOfMembers = groupMembers.length

        if(form.username !== '' && form.admin !== '') {
            users = await usersService.findUserByUsername(form.username)
            newAdmin = await usersService.findUserByUsername(form.admin)


            for(let i = 0; i < lengthOfMembers; i++){
                if(groupMembers[i] === users._id){
                    found = true
                }
                if(admins[i] === newAdmin._id){
                    found2 = true
                }
            }

            if(users !== null && found === false){
                setFailedToAddMember(true)
                flag = false
            }
            if(newAdmin != null && found2 ===false){
                setFailedToAddAdmin(true)
                flag = false
            }
        }
        else{
            flag = true
        }

        return flag

    }

    const createNewGroup = async () => {

        let emptyFormCheck = formEmptyEntryHandler()
        let validCheck = await validFormCheckOneEntry()
        const currentUser = await authService.profile()

        if (currentUser !== null && emptyFormCheck === false && validCheck === true) {

            const group = {
                members: groupMembers,
                createdOn: form.date,
                admin: admins,
                groupName: form.groupName,
                description: form.description
            }

            let status = await groupSerivce.createGroup(currentUser._id, group)
            console.log(status)
            navigate("/messages")

        } else {
            setCreateGroupError(true)
        }
    }


    useEffect(() => {

        const timeId = setTimeout(() => {
            if(addAdminError === true || addMemberError === true ||
                emptyUsernameError === true || emptyDateError === true ||
                emptyAdminError === true || emptyGroupNameError === true ||
                sucessfulAddMember === true || sucessfulAddAdmin === true ||
                createGroupError === true || failedToAddMember === true ||
                failedToAddAdmin === true)

                setAddAdminError(false)
            setAddMemberError(false)
            setEmptyUsernameErrors(false)
            setEmptyDateErrors(false)
            setEmptyAdminErrors(false)
            setEmptyGroupNameErrors(false)
            setSucessfulAddMember(false)
            setSucessfullAddAdmin(false)
            setCreateGroupError(false)
            setFailedToAddMember(false)
            setFailedToAddAdmin(false)
        }, 3000)

        return () =>{
            clearTimeout(timeId)
        }
    }, [emptyUsernameError,emptyDateError,
        emptyAdminError,emptyGroupNameError,
        addMemberError,sucessfulAddMember,
        sucessfulAddAdmin,addAdminError,
        createGroupError, failedToAddMember, failedToAddAdmin])

    return (
        <Form>

            <div className="form-group">
                <label htmlFor="membersList">Username</label>
                <input
                    type="text"
                    className="form-control"
                    id="membersList"
                    placeholder="Members"
                    value={form.username}
                    onChange={(e) => setForm({...form, username: e.target.value})}

                />
                <div>
                    <MemberListNoButton group={form} memberList={groupMembers}/>
                </div>
            </div>

            <div className='' style={{color: 'red'}}>
                {emptyUsernameError ?
                    <label htmlFor='error' className='mt-2 mb-2' color='red'>
                        Member cant be empty </label> : ''}
            </div>


            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    type="Date"
                    className="form-control"
                    id="date"
                    placeholder="date"
                    onChange={(e) => setForm({...form, date: e.target.value})}
                />
            </div>

            <div className='' style={{color: 'red'}}>
                {emptyDateError ?
                    <label htmlFor='error' className='mt-2 mb-2' color='red'>
                        Date cant be empty </label> : ''}
            </div>

            <div className="form-group">
                <label htmlFor="admin">Admins User Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="Admin"
                    placeholder="admin"
                    onChange={(e) => setForm({...form, admin: e.target.value})}
                />
                <div>
                    <MemberListNoButton group={form} memberList={admins}/>
                </div>
            </div>

            <div className='' style={{color: 'red'}}>
                {emptyAdminError ?
                    <label htmlFor='error' className='mt-2 mb-2' color='red'>
                        Admins cant be empty </label> : ''}
            </div>

            <div className="form-group">
                <label htmlFor="groupName">Group Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="groupName"
                    placeholder="Group name"
                    onChange={(e) => setForm({...form, groupName: e.target.value})}
                />
            </div>

            <div className='' style={{color: 'red'}}>
                {emptyGroupNameError ?
                    <label htmlFor='error' className='mt-2 mb-2' color='red'>
                        Group name cant be empty </label> : ''}
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="Description"
                    placeholder="Ex CS5500 study group"
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    rows="3">
                </textarea>
            </div>


            <div className='mb-4 mt-4 text-center'>
                <button
                    type="button"
                    className=" btn btn-primary btn-lg active me-2"
                    onClick={createNewGroup}
                >Create Group
                </button>

                <button
                    type="button"
                    className=" btn btn-primary btn-lg active me-2  "
                    onClick={handleAddMembers}
                >Add Member
                </button>

                <button type="button"
                        className=" btn btn-primary btn-lg active"
                        onClick={handleAddAdmin}
                >Add Admin
                </button>
            </div>


            <div className='text-center' style={{color: 'red'}}>
                {failedToAddAdmin ?
                    <label htmlFor='error' className='mt-2 mb-2' color='red'>
                        Please press Add Admin button then press Create Group button </label> : ""}
            </div>

            <div className='text-center' style={{color: 'red'}}>
                {addMemberError ?
                    <label htmlFor='error' className='mt-2 mb-2' color='red'>
                        Add member first or check username </label> : ""}
            </div>

            <div className='text-center' style={{color: 'red'}}>
                {failedToAddMember ?
                    <label htmlFor='error' className='mt-2 mb-2' color='red'>
                        Please press Add Member button then press Create Group button </label> : ""}
            </div>

            <div className='text-center' style={{color: 'green'}}>
                {sucessfulAddMember?
                    <label htmlFor='error' className='mt-2 mb-2'>
                        Member added </label>:''}
            </div>

            <div className='text-center' style={{color: 'red'}}>
                {createGroupError ?
                    <label htmlFor='error' className='mt-2 mb-2' color='red'>
                        Error when creating group! Try Again </label> : ''}
            </div>


            <div className='text-center' style={{color: 'red'}}>
                {addAdminError ?
                    <label htmlFor='error' className='mt-2 mb-2' color='red'>
                        Can not add new admin (not a valid username) </label> : ''}
            </div>

            <div className='text-center' style={{color: 'green'}}>
                {sucessfulAddAdmin?
                    <label htmlFor='error' className='mt-2 mb-2'>
                        Admin Added</label> : ''}
            </div>

        </Form>

    );
};
export default CreateGroup;