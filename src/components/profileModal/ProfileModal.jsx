import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadAction';
import { updateUser } from '../../actions/userAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
    const theme = useMantineTheme();

    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.authReducer.authData)

    const { password, ...other } = data
    const [formData, setFormData] = useState(other)
    const [profileImage, setProfileImage] = useState(null)
    const [coverImage, setCoverImage] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            e.target.name === "profileImage" ?
                setProfileImage(img) :
                setCoverImage(img)
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        let userData = formData;

        if (profileImage) {
            const data = new FormData()
            const filename = Date.now() + profileImage.name
            data.append("name", filename)
            data.append("file", profileImage)
            userData.profilepicture = filename

            try {
                dispatch(uploadImage(data))

            } catch (error) {
                console.log(error)

            }
        }
        if (coverImage) {
            const data = new FormData()
            const filename = Date.now() + coverImage.name
            data.append("name", filename)
            data.append("file", coverImage)
            userData.coverpicture = filename

            try {
                dispatch(uploadImage(data))

            } catch (error) {
                console.log(error)

            }
        }
        
        dispatch(updateUser(params.id, userData))
        setModalOpened(false)

    }
    



    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size="50%"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <form action="" className='infoForm'>
                <h3>Your info</h3>
                <div>
                    <input type="text" className="infoInput" name='firstname' placeholder='First Name' onChange={handleChange} value={formData.firstname} />
                    <input type="text" className="infoInput" name='lastname' placeholder='Last Name' onChange={handleChange} value={formData.lastname} />
                </div>
                <div>
                    <input type="text" className="infoInput" name='worksat' placeholder='Profession ' onChange={handleChange} value={formData.worksat} />

                </div>
                <div>
                    <input type="text" className="infoInput" name='livesin' placeholder='Lives In' onChange={handleChange} value={formData.livesin} />
                    <input type="text" className="infoInput" name='country' placeholder='Country' onChange={handleChange} value={formData.country} />
                </div>
                <div>
                    <input type="text" className="infoInput" name='relationship' placeholder='Relationship Status' onChange={handleChange} value={formData.relationship} />
                </div>
                <div>
                    Profile Image
                    <input type="file" name='profileImage' onChange={onImageChange} />
                    Cover Image
                    <input type="file" name='coverImage' onChange={onImageChange} />
                </div>
                <button className='btn submit-btn' onClick={handleUpdate}>Update</button>
            </form>

        </Modal>
    );
}
export default ProfileModal;