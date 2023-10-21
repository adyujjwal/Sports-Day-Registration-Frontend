import { apiClient } from './ApiClient'

export const creaUserApi
    = (user) => apiClient.post(`api/users`, user)

export const retrieveAllEvents
    = () => apiClient.get(`api/events`)

export const retrieveSelectedEvents
    = (id) => apiClient.get(`/api/events/registered/${id}`)

export const registerForEvent
    = (id, eventId) => apiClient.post(`/api/events/register?eventId=${eventId}&userId=${id}`)

export const unregisterForEvent
    = (id, eventId) => apiClient.post(`/api/events/unregister?eventId=${eventId}&userId=${id}`)