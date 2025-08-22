import React from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { postAdded } from './postsSlice'
import { selectCurrentUsername } from '../auth/authSlice'

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
    postTitle: HTMLInputElement
    postContent: HTMLTextAreaElement
    postAuthor: HTMLSelectElement
}
interface AddPostFormElements extends HTMLFormElement {
    readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(selectCurrentUsername)!

    const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
        // Prevent server submission
        e.preventDefault()

        const { elements } = e.currentTarget
        const title = elements.postTitle.value
        const content = elements.postContent.value
        
        // Now we can pass these in as separate arguments,
        // and the ID will be generated automatically
        dispatch(postAdded(title, content, userId))

        e.currentTarget.reset()
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Post Title:</label>
            <input type="text" id="postTitle" defaultValue="" required />
            <label htmlFor="postAuthor">Author:</label>
            <label htmlFor="postContent">Content:</label>
            <textarea
                id="postContent"
                name="postContent"
                defaultValue=""
                required
            />
            <button>Save Post</button>
        </form>
        </section>
    )
}