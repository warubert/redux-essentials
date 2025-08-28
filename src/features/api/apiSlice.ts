// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use
import type { NewPost, Post, PostUpdate } from '@/features/posts/postsSlice'
import { User } from '../users/usersSlice'
export type { Post }

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
    tagTypes: ['Post'],
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        // The `getPosts` endpoint is a "query" operation that returns data.
        // The return value is a `Post[]` array, and it takes no arguments.
        getPosts: builder.query<Post[], void>({
          // The URL for the request is '/fakeApi/posts'
          query: () => '/posts',
          providesTags: (result = [], error, arg) => [
            'Post',
            ...result.map(({ id }) => ({ type: 'Post', id }) as const)
          ]
        }),
        getPost: builder.query<Post, string>({
          query: postId => `/posts/${postId}`,
          providesTags: (result, error, arg) => [{ type: 'Post', id: arg }]
        }),
        addNewPost: builder.mutation<Post, NewPost>({
          query: initialPost => ({
            // The HTTP URL will be '/fakeApi/posts'
            url: '/posts',
            // This is an HTTP POST request, sending an update
            method: 'POST',
            // Include the entire post object as the body of the request
            body: initialPost
          }),
          invalidatesTags: ['Post']
        }),
        editPost: builder.mutation<Post, PostUpdate>({
          query: post => ({
            url: `posts/${post.id}`,
            method: 'PATCH',
            body: post
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        }),
        getUsers: builder.query<User[], void>({
          query: () => '/users'
    })
    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUsersQuery,
  useAddNewPostMutation,
  useEditPostMutation
} = apiSlice