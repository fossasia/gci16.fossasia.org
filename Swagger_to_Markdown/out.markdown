# Info #
* version: 2.0
* description: Open Event Organizer APIs
* title: Organizer Server APIs
# Paths #
## /Users/Me/Events ##
### Get ###
* operationId: get_user_self_events
* summary: Fetch the current authenticated user's events
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/Event
* type: array
##### 404 #####
* description: User not found
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'users']
## /Login ##
### Post ###
* operationId: post_login
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Token
##### 401 #####
* description: Authentication Failed
* parameters: [{u'schema': {u'$ref': u'#/definitions/Login'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'login']
## /Events/{Event_Id}/Microlocations ##
### Post ###
* operationId: post_microlocation_list
* summary: Create a microlocation
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Microlocation
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/MicrolocationPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'microlocations']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_microlocation_list
* summary: List all microlocations
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/Microlocation
* type: array
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'microlocations']
## /Events/{Event_Id}/Attendees/Check_In_Toggle/{Holder_Identifier}/Check_Out ##
### Post ###
* operationId: post_attendee_check_out
* summary: Check out attendee
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/TicketHolder
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'attendees']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}, {u'required': True, u'type': u'string', u'name': u'holder_identifier', u'in': u'path'}]
## /Events/{Event_Id}/Sponsors ##
### Post ###
* operationId: post_sponsor_list
* summary: Create a sponsor
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Sponsor
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SponsorPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sponsors']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_sponsor_list
* summary: List all sponsors
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/Sponsor
* type: array
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sponsors']
## /Events/{Event_Id}/Sessions/Page ##
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_session_list_paginated
* summary: List sessions in a paginated manner
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/SessionPaginated
* parameters: [{u'type': u'string', u'name': u'start_time_lt', u'in': u'query'}, {u'type': u'string', u'name': u'end_time_lt', u'in': u'query'}, {u'description': u'Order by a field, example "start_time.asc" or "end_time.desc"', u'type': u'string', u'name': u'order_by', u'in': u'query'}, {u'type': u'string', u'name': u'end_time_gt', u'in': u'query'}, {u'type': u'string', u'name': u'start_time_gt', u'in': u'query'}, {u'default': 1, u'description': u'Serial number to start from', u'type': u'integer', u'name': u'start', u'in': u'query'}, {u'default': 20, u'description': u'Limit on the number of results', u'type': u'integer', u'name': u'limit', u'in': u'query'}, {u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
## /Users/{User_Id} ##
### Put ###
* operationId: put_user
* summary: Update a user given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/User
##### 404 #####
* description: Object/Event not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation Error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/UserPut'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'users']
### Get ###
* operationId: get_user
* summary: Fetch a user given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/User
##### 404 #####
* description: User not found
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'users']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'user_id', u'in': u'path'}]
### Delete ###
* operationId: delete_user
* summary: Delete a user given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/User
##### 404 #####
* description: User not found
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'users']
## /Events/{Event_Id}/Attendees/ ##
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_attendees_list
* summary: Get attendees of the event
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/TicketHolder
* type: array
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'attendees']
## /Events/{Event_Id}/Microlocations/Page ##
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_microlocation_list_paginated
* summary: List microlocations in a paginated manner
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/MicrolocationPaginated
* parameters: [{u'default': 1, u'description': u'Serial number to start from', u'type': u'integer', u'name': u'start', u'in': u'query'}, {u'default': 20, u'description': u'Limit on the number of results', u'type': u'integer', u'name': u'limit', u'in': u'query'}, {u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'microlocations']
## /Events/{Event_Id}/Microlocations/{Microlocation_Id} ##
### Put ###
* operationId: put_microlocation
* summary: Update a microlocation given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Microlocation
##### 404 #####
* description: Object/Event not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation Error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/MicrolocationPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'microlocations']
### Get ###
* operationId: get_microlocation
* summary: Fetch a microlocation given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Microlocation
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'microlocations']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'microlocation_id', u'in': u'path'}, {u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Delete ###
* operationId: delete_microlocation
* summary: Delete a microlocation given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Microlocation
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'microlocations']
## /Events/{Event_Id}/Orders/{Identifier} ##
* parameters: [{u'required': True, u'type': u'string', u'name': u'identifier', u'in': u'path'}, {u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_order
* summary: Get information about a ticket
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Order
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'tickets']
## /Events/Page ##
### Get ###
* operationId: get_event_list_paginated
* summary: List events in a paginated manner
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/EventPaginated
* parameters: [{u'type': u'string', u'name': u'start_time_lt', u'in': u'query'}, {u'type': u'string', u'name': u'end_time_lt', u'in': u'query'}, {u'type': u'string', u'name': u'privacy', u'in': u'query'}, {u'description': u'Contains the string in name and description', u'type': u'string', u'name': u'contains', u'in': u'query'}, {u'type': u'string', u'name': u'end_time_gt', u'in': u'query'}, {u'description': u'Comma separated list of additional fields to load. Supported: sessions,tracks,microlocations,speakers,sponsors)', u'type': u'string', u'name': u'include', u'in': u'query'}, {u'type': u'string', u'name': u'type', u'in': u'query'}, {u'type': u'string', u'name': u'location', u'in': u'query'}, {u'type': u'string', u'name': u'time_period', u'in': u'query'}, {u'type': u'string', u'name': u'start_time_gt', u'in': u'query'}, {u'type': u'string', u'name': u'state', u'in': u'query'}, {u'type': u'string', u'name': u'topic', u'in': u'query'}, {u'default': 1, u'description': u'Serial number to start from', u'type': u'integer', u'name': u'start', u'in': u'query'}, {u'type': u'string', u'name': u'sub_topic', u'in': u'query'}, {u'default': 20, u'description': u'Limit on the number of results', u'type': u'integer', u'name': u'limit', u'in': u'query'}, {u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
## /Events/{Event_Id}/Sponsors/{Sponsor_Id} ##
### Put ###
* operationId: put_sponsor
* summary: Update a sponsor given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Sponsor
##### 404 #####
* description: Object/Event not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation Error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SponsorPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sponsors']
### Get ###
* operationId: get_sponsor
* summary: Fetch a sponsor given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Sponsor
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sponsors']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}, {u'required': True, u'type': u'integer', u'name': u'sponsor_id', u'in': u'path'}]
### Delete ###
* operationId: delete_sponsor
* summary: Delete a sponsor given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Sponsor
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sponsors']
## /Events/{Event_Id}/Sessions/Types/{Type_Id} ##
### Put ###
* operationId: put_session_type
* summary: Update a session type given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/SessionType
##### 404 #####
* description: Object/Event not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation Error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SessionTypePost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'type_id', u'in': u'path'}, {u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Delete ###
* operationId: delete_session_type
* summary: Delete a session type given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/SessionType
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
## /Events/{Event_Id}/Sponsors/Types ##
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_sponsor_types_list
* summary: List all sponsor types
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* type: string
* type: array
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}]
* tags: [u'sponsors']
## /Events/{Event_Id}/Speakers/Page ##
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_speaker_list_paginated
* summary: List speakers in a paginated manner
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/SpeakerPaginated
* parameters: [{u'default': 1, u'description': u'Serial number to start from', u'type': u'integer', u'name': u'start', u'in': u'query'}, {u'default': 20, u'description': u'Limit on the number of results', u'type': u'integer', u'name': u'limit', u'in': u'query'}, {u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}]
* tags: [u'speakers']
## /Events/{Event_Id}/Tracks ##
### Post ###
* operationId: post_track_list
* summary: Create a track
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Track
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/TrackPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'tracks']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_track_list
* summary: List all tracks
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/Track
* type: array
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'tracks']
## /Events/{Event_Id}/Attendees/Check_In_Toggle/{Holder_Identifier} ##
### Post ###
* operationId: post_attendee_check_in_toggle
* summary: Toggle and Attendee's Checked in State
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/TicketHolder
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'attendees']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}, {u'required': True, u'type': u'string', u'name': u'holder_identifier', u'in': u'path'}]
## /Events/{Event_Id}/Sessions ##
### Post ###
* operationId: post_session_list
* summary: Create a session
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Session
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SessionPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_session_list
* summary: List all sessions
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/Session
* type: array
* parameters: [{u'type': u'string', u'name': u'start_time_lt', u'in': u'query'}, {u'type': u'string', u'name': u'end_time_lt', u'in': u'query'}, {u'description': u'Order by a field, example "start_time.asc" or "end_time.desc"', u'type': u'string', u'name': u'order_by', u'in': u'query'}, {u'type': u'string', u'name': u'end_time_gt', u'in': u'query'}, {u'type': u'string', u'name': u'start_time_gt', u'in': u'query'}, {u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
## /Events/{Event_Id}/Links/{Link_Id} ##
### Put ###
* operationId: put_social_link
* summary: Update a social link given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/SocialLink
##### 404 #####
* description: Object/Event not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation Error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SocialLinkPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'link_id', u'in': u'path'}, {u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Delete ###
* operationId: delete_social_link
* summary: Delete a social link given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/SocialLink
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
## /Events/{Event_Id}/Sessions/Types ##
### Post ###
* operationId: post_session_type_list
* summary: Create a session type
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/SessionType
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SessionTypePost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_session_type_list
* summary: List all session types
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/SessionType
* type: array
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
## /Users ##
### Post ###
* operationId: post_user_list
* summary: Create a user
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/User
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/UserPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'users']
### Get ###
* operationId: get_user_list
* summary: List all users
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/User
* type: array
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'users']
## /Events/{Event_Id}/Tracks/Page ##
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_track_list_paginated
* summary: List tracks in a paginated manner
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/TrackPaginated
* parameters: [{u'default': 1, u'description': u'Serial number to start from', u'type': u'integer', u'name': u'start', u'in': u'query'}, {u'default': 20, u'description': u'Limit on the number of results', u'type': u'integer', u'name': u'limit', u'in': u'query'}, {u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'tracks']
## /Events ##
### Post ###
* operationId: post_event_list
* summary: Create an event
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Event
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/EventPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
### Get ###
* operationId: get_event_list
* summary: List all events
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/EventComplete
* type: array
* parameters: [{u'type': u'string', u'name': u'start_time_lt', u'in': u'query'}, {u'type': u'string', u'name': u'end_time_lt', u'in': u'query'}, {u'type': u'string', u'name': u'privacy', u'in': u'query'}, {u'description': u'Contains the string in name and description', u'type': u'string', u'name': u'contains', u'in': u'query'}, {u'type': u'string', u'name': u'end_time_gt', u'in': u'query'}, {u'description': u'Comma separated list of additional fields to load. Supported: sessions,tracks,microlocations,speakers,sponsors)', u'type': u'string', u'name': u'include', u'in': u'query'}, {u'type': u'string', u'name': u'type', u'in': u'query'}, {u'type': u'string', u'name': u'location', u'in': u'query'}, {u'type': u'string', u'name': u'time_period', u'in': u'query'}, {u'type': u'string', u'name': u'start_time_gt', u'in': u'query'}, {u'type': u'string', u'name': u'state', u'in': u'query'}, {u'type': u'string', u'name': u'sub_topic', u'in': u'query'}, {u'type': u'string', u'name': u'topic', u'in': u'query'}, {u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
## /Events/{Event_Id}/Notifications ##
### Post ###
* operationId: post_user_notifications
* summary: Create user notification
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Notification
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/NotificationPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'notifications']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
## /Events/{Event_Id}/Tickets/{Ticket_Id} ##
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}, {u'required': True, u'type': u'integer', u'name': u'ticket_id', u'in': u'path'}]
### Get ###
* operationId: get_ticket
* summary: Get information about a ticket
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Ticket
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'tickets']
## /Events/{Event_Id}/Links ##
### Post ###
* operationId: post_social_link_list
* summary: Create a social link
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/SocialLink
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SocialLinkPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
* parameters: [{u'description': None, u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_social_link_list
* summary: List all social links
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/SocialLink
* type: array
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
## /Users/Me ##
### Get ###
* operationId: get_user_self
* summary: Fetch the current authenticated user
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/User
##### 404 #####
* description: User not found
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'users']
## /Events/{Event_Id}/Speakers ##
### Post ###
* operationId: post_speaker_list
* summary: Create a speaker
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Speaker
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SpeakerPost'}, u'required': True, u'name': u'payload', u'in': u'body'}]
* tags: [u'speakers']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_speaker_list
* summary: List all speakers
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/Speaker
* type: array
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}]
* tags: [u'speakers']
## /Events/{Event_Id}/Sessions/{Session_Id} ##
### Put ###
* operationId: put_session
* summary: Update a session given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Session
##### 404 #####
* description: Object/Event not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation Error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SessionPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
### Get ###
* operationId: get_session
* summary: Fetch a session given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Session
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'session_id', u'in': u'path'}, {u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Delete ###
* operationId: delete_session
* summary: Delete a session given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Session
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sessions']
## /Users/Page ##
### Get ###
* operationId: get_user_list_paginated
* summary: List users in a paginated manner
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/UserPaginated
* parameters: [{u'default': 1, u'description': u'Serial number to start from', u'type': u'integer', u'name': u'start', u'in': u'query'}, {u'default': 20, u'description': u'Limit on the number of results', u'type': u'integer', u'name': u'limit', u'in': u'query'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'users']
## /Events/{Event_Id}/Event ##
* parameters: [{u'description': None, u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/EventComplete
##### 404 #####
* description: Event not found
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
* description: Alternate endpoint for fetching an event.
* summary: Fetch an event given its id
* operationId: get_event_webapp
## /Events/{Event_Id}/Speakers/{Speaker_Id} ##
### Put ###
* operationId: put_speaker
* summary: Update a speaker given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Speaker
##### 404 #####
* description: Object/Event not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation Error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/SpeakerPost'}, u'required': True, u'name': u'payload', u'in': u'body'}]
* tags: [u'speakers']
### Get ###
* operationId: get_speaker
* summary: Fetch a speaker given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Speaker
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}]
* tags: [u'speakers']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'speaker_id', u'in': u'path'}, {u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Delete ###
* operationId: delete_speaker
* summary: Delete a speaker given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Speaker
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* tags: [u'speakers']
## /Events/{Event_Id}/Tracks/{Track_Id} ##
### Put ###
* operationId: put_track
* summary: Update a track given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Track
##### 404 #####
* description: Object/Event not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation Error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/TrackPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'tracks']
### Get ###
* operationId: get_track
* summary: Fetch a track given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Track
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* parameters: [{u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'tracks']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}, {u'required': True, u'type': u'integer', u'name': u'track_id', u'in': u'path'}]
### Delete ###
* operationId: delete_track
* summary: Delete a track given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Track
##### 404 #####
* description: Service not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 400 #####
* description: Service does not belong to event
###### Schema ######
* $ref: #/definitions/InvalidServiceError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'tracks']
## /Events/{Event_Id}/Sponsors/Page ##
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_sponsor_list_paginated
* summary: List sponsors in a paginated manner
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/SponsorPaginated
* parameters: [{u'default': 1, u'description': u'Serial number to start from', u'type': u'integer', u'name': u'start', u'in': u'query'}, {u'default': 20, u'description': u'Limit on the number of results', u'type': u'integer', u'name': u'limit', u'in': u'query'}, {u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'sponsors']
## /Events/{Event_Id}/Attendees/Check_In_Toggle/{Holder_Identifier}/Check_In ##
### Post ###
* operationId: post_attendee_check_in
* summary: Check in attendee
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/TicketHolder
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'attendees']
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}, {u'required': True, u'type': u'string', u'name': u'holder_identifier', u'in': u'path'}]
## /Events/{Event_Id} ##
### Put ###
* operationId: put_event
* summary: Update an event given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Event
##### 404 #####
* description: Object/Event not found
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation Error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'schema': {u'$ref': u'#/definitions/EventPost'}, u'required': True, u'name': u'payload', u'in': u'body'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
### Get ###
* operationId: get_event
* summary: Fetch an event given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/EventComplete
##### 404 #####
* description: Event not found
* parameters: [{u'description': u'Comma separated list of additional fields to load. Supported: sessions,tracks,microlocations,speakers,sponsors,tickets)', u'type': u'string', u'name': u'include', u'in': u'query'}, {u'description': u'ETag saved by client for cached resource', u'type': u'string', u'name': u'If-None-Match', u'in': u'header'}, {u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
* parameters: [{u'description': None, u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Delete ###
* operationId: delete_event
* summary: Delete an event given its id
#### Responses ####
##### 200 #####
* description: Success
###### Schema ######
* $ref: #/definitions/Event
##### 404 #####
* description: Event not found
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'events']
## /Events/{Event_Id}/Tickets/ ##
* parameters: [{u'required': True, u'type': u'integer', u'name': u'event_id', u'in': u'path'}]
### Get ###
* operationId: get_tickets_list
* summary: Get tickets of the event
#### Responses ####
##### 201 #####
* description: Resource created successfully
##### 200 #####
* description: Success
###### Schema ######
###### Items ######
* $ref: #/definitions/Ticket
* type: array
##### 404 #####
* description: Event does not exist
###### Schema ######
* $ref: #/definitions/NotFoundError
##### 401 #####
* description: Authentication failure
###### Schema ######
* $ref: #/definitions/NotAuthorizedError
##### 400 #####
* description: Validation error
###### Schema ######
* $ref: #/definitions/ValidationError
* parameters: [{u'in': u'header', u'type': u'string', u'description': u'An optional fields mask', u'name': u'X-Fields', u'format': u'mask'}]
* tags: [u'tickets']
# Responses #
## Notauthorizederror ##
## Invalidserviceerror ##
## Validationerror ##
## Notfounderror ##
## Parseerror ##
* description: When a mask can't be parsed
## Maskerror ##
* description: When any error occurs on mask
## Permissiondeniederror ##
* tags: [{u'description': u'Default namespace', u'name': u'default'}, {u'description': u'Events', u'name': u'events'}, {u'description': u'Sessions', u'name': u'sessions'}, {u'description': u'Tracks', u'name': u'tracks'}, {u'description': u'Speakers', u'name': u'speakers'}, {u'description': u'Sponsors', u'name': u'sponsors'}, {u'description': u'Microlocations', u'name': u'microlocations'}, {u'description': u'Login', u'name': u'login'}, {u'description': u'Exports', u'name': u'exports'}, {u'description': u'Imports', u'name': u'imports'}, {u'description': u'Users', u'name': u'users'}, {u'description': u'Extras', u'name': u'extras'}, {u'description': u'Notifications', u'name': u'notifications'}, {u'description': u'Error Responses', u'name': u'errors'}, {u'description': u'Attendees', u'name': u'attendees'}, {u'description': u'Tickets', u'name': u'tickets'}]
* basePath: /api/v2
* produces: [u'application/json']
* host: open-event-dev.herokuapp.com
# Definitions #
## Sessionpaginated ##
* type: object
### Properties ###
#### Count ####
* type: integer
#### Results ####
##### Items #####
* $ref: #/definitions/Session
* type: array
#### Next ####
* type: string
#### Start ####
* type: integer
#### Limit ####
* type: integer
#### Previous ####
* type: string
## Sponsorpaginated ##
* type: object
### Properties ###
#### Count ####
* type: integer
#### Results ####
##### Items #####
* $ref: #/definitions/Sponsor
* type: array
#### Next ####
* type: string
#### Start ####
* type: integer
#### Limit ####
* type: integer
#### Previous ####
* type: string
## Microlocationpaginated ##
* type: object
### Properties ###
#### Count ####
* type: integer
#### Results ####
##### Items #####
* $ref: #/definitions/Microlocation
* type: array
#### Next ####
* type: string
#### Start ####
* type: integer
#### Limit ####
* type: integer
#### Previous ####
* type: string
## Sessionpost ##
* required: [u'end_time', u'start_time', u'title']
* type: object
### Properties ###
#### Short_Abstract ####
* type: string
#### Microlocation_Id ####
* type: integer
* example: 0
* format: int
#### Subtitle ####
* type: string
#### Language ####
* type: string
* example: German
#### Speaker_Ids ####
##### Items #####
* type: integer
* example: 0
* format: int
* type: array
#### Start_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Title ####
* type: string
#### Session_Type_Id ####
* type: integer
* example: 0
* format: int
#### Comments ####
* type: string
#### Track_Id ####
* type: integer
* example: 0
* format: int
#### Slides ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### State ####
* type: string
* example: pending
#### Video ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### End_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Audio ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Signup_Url ####
* type: string
* example: http://website.com
* format: uri
#### Long_Abstract ####
* type: string
## Notfounderror ##
* type: object
### Properties ###
#### Status ####
* type: string
* example: NOT_FOUND
#### Field ####
* type: string
#### Message ####
* type: string
#### Code ####
* type: integer
* example: 404
## Eventcfs ##
* type: object
### Properties ###
#### Timezone ####
* type: string
#### Announcement ####
* type: string
#### Start_Date ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### End_Date ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Privacy ####
* type: string
* example: public
## Speakerpost ##
* required: [u'country', u'email', u'name', u'organisation']
* type: object
### Properties ###
#### Website ####
* type: string
* example: http://website.com
* format: uri
#### Short_Biography ####
* type: string
#### Organisation ####
* type: string
#### Name ####
* type: string
#### Long_Biography ####
* type: string
#### Mobile ####
* type: string
#### Photo ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Twitter ####
* type: string
#### Linkedin ####
* type: string
#### Featured ####
* type: boolean
* example: False
#### Github ####
* type: string
#### Facebook ####
* type: string
#### Country ####
* type: string
#### Position ####
* type: string
#### Email ####
* type: string
* example: email@domain.com
* format: email
## Speaker ##
* required: [u'country', u'email', u'id', u'name', u'organisation']
* type: object
### Properties ###
#### Website ####
* type: string
* example: http://website.com
* format: uri
#### Short_Biography ####
* type: string
#### Organisation ####
* type: string
#### Name ####
* type: string
#### Long_Biography ####
* type: string
#### Sessions ####
##### Items #####
* $ref: #/definitions/SpeakerSession
* type: array
#### Mobile ####
* type: string
#### Photo ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Twitter ####
* type: string
#### Linkedin ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
#### Featured ####
* type: boolean
* example: False
#### Github ####
* type: string
#### Facebook ####
* type: string
#### Country ####
* type: string
#### Position ####
* type: string
#### Email ####
* type: string
* example: email@domain.com
* format: email
## Sessiontype ##
* required: [u'id', u'length', u'name']
* type: object
### Properties ###
#### Length ####
* type: number
* example: 0.0
* format: float
#### Name ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
## Invalidserviceerror ##
* type: object
### Properties ###
#### Status ####
* type: string
* example: INVALID_SERVICE
#### Field ####
* type: string
#### Message ####
* type: string
#### Code ####
* type: integer
* example: 400
## Trackpaginated ##
* type: object
### Properties ###
#### Count ####
* type: integer
#### Results ####
##### Items #####
* $ref: #/definitions/Track
* type: array
#### Next ####
* type: string
#### Start ####
* type: integer
#### Limit ####
* type: integer
#### Previous ####
* type: string
## Trackpost ##
* required: [u'color', u'name']
* type: object
### Properties ###
#### Color ####
* type: string
* example: green
* format: color
#### Track_Image_Url ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Description ####
* type: string
#### Name ####
* type: string
#### Location ####
* type: string
## Notauthorizederror ##
* type: object
### Properties ###
#### Status ####
* type: string
* example: NOT_AUTHORIZED
#### Field ####
* type: string
#### Message ####
* type: string
#### Code ####
* type: integer
* example: 401
## Sessionmicrolocation ##
* required: [u'id']
* type: object
### Properties ###
#### Name ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
## Track ##
* required: [u'color', u'id', u'name']
* type: object
### Properties ###
#### Description ####
* type: string
#### Sessions ####
##### Items #####
* $ref: #/definitions/TrackSession
* type: array
#### Color ####
* type: string
* example: green
* format: color
#### Track_Image_Url ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Location ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
#### Name ####
* type: string
## Userdetail ##
* type: object
### Properties ###
#### Firstname ####
* type: string
#### Lastname ####
* type: string
#### Twitter ####
* type: string
#### Contact ####
* type: string
#### Facebook ####
* type: string
#### Avatar ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Details ####
* type: string
## Sociallinkpost ##
* required: [u'link', u'name']
* type: object
### Properties ###
#### Link ####
* type: string
#### Name ####
* type: string
## Sessiontrack ##
* required: [u'id']
* type: object
### Properties ###
#### Name ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
## Sponsorpost ##
* required: [u'name']
* type: object
### Properties ###
#### Description ####
* type: string
#### Level ####
* type: string
#### Url ####
* type: string
* example: http://website.com
* format: uri
#### Sponsor_Type ####
* type: string
#### Logo ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Name ####
* type: string
## Sessiontypepost ##
* required: [u'length', u'name']
* type: object
### Properties ###
#### Length ####
* type: number
* example: 0.0
* format: float
#### Name ####
* type: string
## Notification ##
* required: [u'email', u'id']
* type: object
### Properties ###
#### Title ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
#### Received_At ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Action ####
* type: string
#### Message ####
* type: string
#### Email ####
* type: string
## Ticket ##
* type: object
### Properties ###
#### Description ####
* type: string
#### Price ####
* type: number
* example: 0.0
* format: float
#### Quantity ####
* type: integer
* example: 0
* format: int
#### Type ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
#### Name ####
* type: string
## User ##
* required: [u'email']
* type: object
### Properties ###
#### Email ####
* type: string
* example: email@domain.com
* format: email
#### Signup_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### User_Detail ####
* $ref: #/definitions/UserDetail
#### Id ####
* type: integer
* example: 0
* format: int
#### Last_Access_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
## Userpost ##
* required: [u'email', u'password']
* type: object
### Properties ###
#### Password ####
* type: string
#### Email ####
* type: string
* example: email@domain.com
* format: email
## Validationerror ##
* type: object
### Properties ###
#### Status ####
* type: string
* example: INVALID_FIELD
#### Field ####
* type: string
#### Message ####
* type: string
#### Code ####
* type: integer
* example: 400
## Userput ##
* required: [u'email']
* type: object
### Properties ###
#### User_Detail ####
* $ref: #/definitions/UserDetail
#### Email ####
* type: string
* example: email@domain.com
* format: email
## Microlocation ##
* required: [u'id', u'name']
* type: object
### Properties ###
#### Room ####
* type: string
#### Floor ####
* type: integer
* example: 0
* format: int
#### Longitude ####
* type: number
* example: 0.0
* format: float
#### Latitude ####
* type: number
* example: 0.0
* format: float
#### Id ####
* type: integer
* example: 0
* format: int
#### Name ####
* type: string
## Notificationpost ##
* required: [u'email']
* type: object
### Properties ###
#### Received_At ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Action ####
* type: string
#### Message ####
* type: string
#### Email ####
* type: string
#### Title ####
* type: string
## Eventpost ##
* required: [u'end_time', u'name', u'start_time']
* type: object
### Properties ###
#### Event_Url ####
* type: string
* example: http://website.com
* format: uri
#### Schedule_Published_On ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Topic ####
* type: string
* example: Auto, Boat & Air
#### Logo ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Timezone ####
* type: string
#### Searchable_Location_Name ####
* type: string
#### Background_Image ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Location_Name ####
* type: string
#### Copyright ####
* $ref: #/definitions/EventCopyright
#### Privacy ####
* type: string
* example: public
#### State ####
* default: Draft
* type: string
* example: Draft
#### Latitude ####
* type: number
* example: 0.0
* format: float
#### Organizer_Description ####
* type: string
#### Type ####
* type: string
* example: Appearance or Signing
#### Thumbnail ####
* type: string
* example: http://website.com
* format: uri
#### End_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Description ####
* type: string
#### Start_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Ticket_Url ####
* type: string
* example: http://website.com
* format: uri
#### Name ####
* type: string
#### Longitude ####
* type: number
* example: 0.0
* format: float
#### Email ####
* type: string
* example: email@domain.com
* format: email
#### Large ####
* type: string
* example: http://website.com
* format: uri
#### Call_For_Papers ####
* $ref: #/definitions/EventCFS
#### Has_Session_Speakers ####
* default: False
* type: boolean
* example: False
#### Sub_Topic ####
* type: string
* example: Air
#### Identifier ####
* type: string
#### Organizer_Name ####
* type: string
#### Code_Of_Conduct ####
* type: string
## Sessionspeaker ##
* required: [u'id']
* type: object
### Properties ###
#### Organisation ####
* type: string
#### Name ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
## Token ##
* type: object
### Properties ###
#### Access_Token ####
* type: string
## Sociallink ##
* required: [u'link', u'name']
* type: object
### Properties ###
#### Link ####
* type: string
#### Name ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
## Eventcomplete ##
* required: [u'end_time', u'id', u'name', u'start_time']
* type: object
### Properties ###
#### Event_Url ####
* type: string
* example: http://website.com
* format: uri
#### Creator ####
* $ref: #/definitions/EventCreator
#### Schedule_Published_On ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Topic ####
* type: string
* example: Auto, Boat & Air
#### Microlocations ####
##### Items #####
* $ref: #/definitions/Microlocation
* type: array
#### Logo ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Timezone ####
* type: string
#### Searchable_Location_Name ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
#### Speakers ####
##### Items #####
* $ref: #/definitions/Speaker
* type: array
#### Location_Name ####
* type: string
#### Copyright ####
* $ref: #/definitions/EventCopyright
#### Privacy ####
* type: string
* example: public
#### State ####
* default: Draft
* type: string
* example: Draft
#### Version ####
* $ref: #/definitions/EventVersion
#### Latitude ####
* type: number
* example: 0.0
* format: float
#### Organizer_Description ####
* type: string
#### Type ####
* type: string
* example: Appearance or Signing
#### Email ####
* type: string
* example: email@domain.com
* format: email
#### End_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Description ####
* type: string
#### Sessions ####
##### Items #####
* $ref: #/definitions/Session
* type: array
#### Start_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Ticket_Url ####
* type: string
* example: http://website.com
* format: uri
#### Background_Image ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Sponsors ####
##### Items #####
* $ref: #/definitions/Sponsor
* type: array
#### Tracks ####
##### Items #####
* $ref: #/definitions/Track
* type: array
#### Tickets ####
##### Items #####
* $ref: #/definitions/Ticket
* type: array
#### Name ####
* type: string
#### Social_Links ####
##### Items #####
* $ref: #/definitions/SocialLink
* type: array
#### Longitude ####
* type: number
* example: 0.0
* format: float
#### Thumbnail ####
* type: string
* example: http://website.com
* format: uri
#### Large ####
* type: string
* example: http://website.com
* format: uri
#### Call_For_Papers ####
* $ref: #/definitions/EventCFS
#### Has_Session_Speakers ####
* default: False
* type: boolean
* example: False
#### Sub_Topic ####
* type: string
* example: Air
#### Identifier ####
* type: string
#### Organizer_Name ####
* type: string
#### Code_Of_Conduct ####
* type: string
## Eventcopyright ##
* type: object
### Properties ###
#### Licence_Url ####
* type: string
* example: http://website.com
* format: uri
#### Holder_Url ####
* type: string
* example: http://website.com
* format: uri
#### Licence ####
* type: string
#### Year ####
* type: integer
* example: 0
* format: int
#### Logo ####
* type: string
#### Holder ####
* type: string
## Login ##
* required: [u'email', u'password']
* type: object
### Properties ###
#### Password ####
* type: string
#### Email ####
* type: string
* example: email@domain.com
* format: email
## Order ##
* type: object
### Properties ###
#### Status ####
* type: string
#### Paid_Via ####
* type: string
#### Completed_At ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Amount ####
* type: number
* example: 0.0
* format: float
#### Payment_Mode ####
* type: string
#### Invoice_Number ####
* type: string
#### Identifier ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
## Eventversion ##
* type: object
### Properties ###
#### Speakers_Ver ####
* type: integer
* example: 0
* format: int
#### Event_Ver ####
* type: integer
* example: 0
* format: int
#### Tracks_Ver ####
* type: integer
* example: 0
* format: int
#### Sessions_Ver ####
* type: integer
* example: 0
* format: int
#### Microlocations_Ver ####
* type: integer
* example: 0
* format: int
#### Sponsors_Ver ####
* type: integer
* example: 0
* format: int
## Speakersession ##
* type: object
### Properties ###
#### Id ####
* type: integer
* example: 0
* format: int
#### Title ####
* type: string
## Ticketholder ##
* type: object
### Properties ###
#### Checked_In ####
* type: boolean
* example: False
#### Firstname ####
* type: string
#### Lastname ####
* type: string
#### Email ####
* type: string
* example: email@domain.com
* format: email
#### Ticket ####
* $ref: #/definitions/Ticket
#### Order ####
* $ref: #/definitions/Order
#### Id ####
* type: integer
* example: 0
* format: int
## Userpaginated ##
* type: object
### Properties ###
#### Count ####
* type: integer
#### Results ####
##### Items #####
* $ref: #/definitions/User
* type: array
#### Next ####
* type: string
#### Start ####
* type: integer
#### Limit ####
* type: integer
#### Previous ####
* type: string
## Speakerpaginated ##
* type: object
### Properties ###
#### Count ####
* type: integer
#### Results ####
##### Items #####
* $ref: #/definitions/Speaker
* type: array
#### Next ####
* type: string
#### Start ####
* type: integer
#### Limit ####
* type: integer
#### Previous ####
* type: string
## Session ##
* required: [u'end_time', u'id', u'start_time', u'title']
* type: object
### Properties ###
#### Short_Abstract ####
* type: string
#### Speakers ####
##### Items #####
* $ref: #/definitions/SessionSpeaker
* type: array
#### Subtitle ####
* type: string
#### Language ####
* type: string
* example: German
#### Title ####
* type: string
#### Track ####
* $ref: #/definitions/SessionTrack
#### Start_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Session_Type ####
* $ref: #/definitions/SessionType
#### Comments ####
* type: string
#### Slides ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### State ####
* type: string
* example: pending
#### Video ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### End_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Microlocation ####
* $ref: #/definitions/SessionMicrolocation
#### Audio ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Signup_Url ####
* type: string
* example: http://website.com
* format: uri
#### Id ####
* type: integer
* example: 0
* format: int
#### Long_Abstract ####
* type: string
## Sponsor ##
* required: [u'id', u'name']
* type: object
### Properties ###
#### Description ####
* type: string
#### Level ####
* type: string
#### Url ####
* type: string
* example: http://website.com
* format: uri
#### Sponsor_Type ####
* type: string
#### Logo ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Id ####
* type: integer
* example: 0
* format: int
#### Name ####
* type: string
## Tracksession ##
* required: [u'id']
* type: object
### Properties ###
#### Id ####
* type: integer
* example: 0
* format: int
#### Title ####
* type: string
## Eventcreator ##
* type: object
### Properties ###
#### Email ####
* type: string
* example: email@domain.com
* format: email
#### Id ####
* type: integer
* example: 0
* format: int
## Eventpaginated ##
* type: object
### Properties ###
#### Count ####
* type: integer
#### Results ####
##### Items #####
* $ref: #/definitions/Event
* type: array
#### Next ####
* type: string
#### Start ####
* type: integer
#### Limit ####
* type: integer
#### Previous ####
* type: string
## Event ##
* required: [u'end_time', u'id', u'name', u'start_time']
* type: object
### Properties ###
#### Event_Url ####
* type: string
* example: http://website.com
* format: uri
#### Creator ####
* $ref: #/definitions/EventCreator
#### Schedule_Published_On ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Topic ####
* type: string
* example: Auto, Boat & Air
#### Logo ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Timezone ####
* type: string
#### Searchable_Location_Name ####
* type: string
#### Id ####
* type: integer
* example: 0
* format: int
#### Background_Image ####
* type: string
* example: http://website.com/item.ext
* format: uri
#### Location_Name ####
* type: string
#### Copyright ####
* $ref: #/definitions/EventCopyright
#### Privacy ####
* type: string
* example: public
#### State ####
* default: Draft
* type: string
* example: Draft
#### Version ####
* $ref: #/definitions/EventVersion
#### Latitude ####
* type: number
* example: 0.0
* format: float
#### Organizer_Description ####
* type: string
#### Type ####
* type: string
* example: Appearance or Signing
#### Thumbnail ####
* type: string
* example: http://website.com
* format: uri
#### End_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Description ####
* type: string
#### Start_Time ####
* type: string
* example: 2016-06-06T11:22:33
* format: date-time
#### Ticket_Url ####
* type: string
* example: http://website.com
* format: uri
#### Name ####
* type: string
#### Social_Links ####
##### Items #####
* $ref: #/definitions/SocialLink
* type: array
#### Longitude ####
* type: number
* example: 0.0
* format: float
#### Email ####
* type: string
* example: email@domain.com
* format: email
#### Large ####
* type: string
* example: http://website.com
* format: uri
#### Call_For_Papers ####
* $ref: #/definitions/EventCFS
#### Has_Session_Speakers ####
* default: False
* type: boolean
* example: False
#### Sub_Topic ####
* type: string
* example: Air
#### Identifier ####
* type: string
#### Organizer_Name ####
* type: string
#### Code_Of_Conduct ####
* type: string
## Microlocationpost ##
* required: [u'name']
* type: object
### Properties ###
#### Latitude ####
* type: number
* example: 0.0
* format: float
#### Name ####
* type: string
#### Room ####
* type: string
#### Longitude ####
* type: number
* example: 0.0
* format: float
#### Floor ####
* type: integer
* example: 0
* format: int
* swagger: 2.0
* consumes: [u'application/json']
