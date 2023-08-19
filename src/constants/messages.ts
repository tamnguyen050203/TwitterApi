export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXIST: 'Email is already exist',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  USER_OR_PASSWORD_INCORRECT: 'User or password incorrect',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_100: 'Password length must be from 6 to 100',
  PASSWORD_MUST_BE_STRONG: 'Password must be 6 length and include 1 lowercase, 1 uppercase, 1 number and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_100: 'Confirm password length must be from 6 to 100',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be 6 length and include 1 lowercase, 1 uppercase, 1 number and 1 symbol',
  PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH: 'Password and confirm password not match',
  DATE_OF_BIRTH_MUST_BE_ISO08601_FORMAT: 'Date of birth must be ISO08601 format',
  LOGIN_SUCCESSFUL: 'Login successful',
  REGISTER_SUCCESSFUL: 'Register successful',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  ACCESS_TOKEN_IS_INVALID: 'Access token is invalid',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  REFRESH_TOKEN_IS_EXPIRED_OR_USED: 'Refresh token is expired or used',
  LOGOUT_SUCCESSFUL: 'Logout successful',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  VERIFY_EMAIL_SUCCESSFUL: 'Verify email successful',
  RESEND_VERIFY_EMAIL_SUCCESSFUL: 'Resend verify email successful',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESSFUL: 'Verify forgot password token successful',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password success',
  RESET_PASSWORD_SUCCESSFUL: 'Reset password successful',
  GET_USER_PROFILE_SUCCESSFUL: 'Get user profile successful',
  GET_ME_SUCCESSFUL: 'Get me successful',
  USER_NOT_VERIFIED: 'User not verified',
  BIO_MUST_BE_STRING: 'Bio must be string',
  BIO_MUST_BE_BETWEEN_1_AND_200_CHARACTERS: 'Bio must be between 1 and 200 characters',
  LOCATION_MUST_BE_STRING: 'Location must be string',
  LOCATION_MUST_BE_BETWEEN_1_AND_200_CHARACTERS: 'Location must be between 1 and 200 characters',
  WEBSITE_MUST_BE_STRING: 'Website must be string',
  WEBSITE_MUST_BE_BETWEEN_1_AND_200_CHARACTERS: 'Website must be between 1 and 200 characters',
  USERNAME_MUST_BE_STRING: 'Username must be string',
  USERNAME_MUST_BE_BETWEEN_1_AND_50_CHARACTERS: 'Username must be between 1 and 50 characters',
  IMAGE_MUST_BE_STRING: 'Image must be string',
  IMAGE_MUST_BE_BETWEEN_1_AND_400_CHARACTERS: 'Image must be between 1 and 400 characters',
  UPDATE_ME_SUCCESSFUL: 'Update me successful',
  GET_PROFILE_SUCCESSFUL: 'Get profile successful',
  FOLLOW_SUCCESSFUL: 'Follow successful',
  FOLLOWED: 'Followed',
  CANNOT_FOLLOW_YOURSELF: 'Cannot follow yourself',
  INVALID_USER_ID: 'Invalid user id',
  UNFOLLOW_SUCCESSFUL: 'Unfollow successful',
  ALREADY_UNFOLLOWED: 'Already unfollowed',
  USERNAME_IS_INVALID:
    'Username must be 4-15 characters and only include letters, numbers and underscores, not only numbers',
  USERNAME_IS_EXISTED: 'Username is existed',
  CHANGE_PASSWORD_SUCCESSFUL: 'Change password successful',
  PASSWORD_INCORRECT: 'Password incorrect',
  GMAIL_NOT_VERIFIED: 'Gmail not verified',
  REFRESH_TOKEN_SUCCESSFUL: 'Refresh token successful'
} as const

export const MEDIA_MESSAGES = {
  UPLOAD_SUCCESSFUL: 'Upload successful',
  NOT_FOUND: 'Not found',
  REQUIRED_RANGE_HEADER: 'Required range header',
  GET_VIDEO_STATUS_SUCCESSFUL: 'Get video status successful'
} as const

export const TWEET_MESSAGES = {
  INVALID_TYPE: 'Invalid type',
  INVALID_AUDIENCE: 'Invalid audience',
  INVALID_MEDIA: 'Invalid media',
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'Parent id must be a valid tweet id',
  PARENT_ID_MUST_BE_NULL: 'Parent id must be null',
  CONTENT_MUST_BE_EMPTY: 'Content must be empty',
  CONTENT_MUST_BE_A_NON_EMPTY_STRING: 'Content must be a non-empty string',
  HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING: 'Hashtags must be an array of string',
  MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID: 'Mentions must be an array of user id',
  MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT: 'Medias must be an array of media object',
  CREATE_TWEET_SUCCESSFUL: 'Create tweet successful',
  INVALID_TWEET_ID: 'Invalid tweet id',
  TWEET_NOT_FOUND: 'Tweet not found',
  GET_TWEET_SUCCESSFUL: 'Get tweet successful',
  TWEET_IS_NOT_PUBLIC: 'Tweet is not public',
  GET_TWEET_CHILDREN_SUCCESSFUL: 'Get tweet children successful',
  LIMIT_MUST_BE_BETWEEN_1_AND_100: 'Limit must be between 1 and 100',
  PAGE_MUST_BE_GREATER_THAN_0: 'Page must be greater than 0',
  GET_NEW_FEEDS_SUCCESSFUL: 'Get new feeds successful'
} as const

export const BOOKMARK_MESSAGES = {
  TWEET_ID_REQUIRED: 'Tweet id is required',
  BOOKMARK_SUCCESSFUL: 'Bookmark successful',
  REMOVE_BOOKMARK_SUCCESSFUL: 'Remove bookmark successful'
} as const

export const SEARCH_MESSAGES = {
  SEARCH_SUCCESSFULLY: 'Search successfully'
}
