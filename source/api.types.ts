export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date custom scalar type */
  DateTime: any
  /** Date custom scalar type */
  Duration: any
}

export type Booking = {
  __typename?: 'Booking'
  user: User
  code: Scalars['String']
  start: Scalars['DateTime']
  duration: Scalars['Duration']
  place: Place
}

export type CreateBookingInput = {
  start: Scalars['DateTime']
  duration: Scalars['Duration']
  placeId: Scalars['Float']
  userId: Scalars['Float']
}

export type CreatePlaceInput = {
  placeId: Scalars['String']
  name: Scalars['String']
  openingTime: Scalars['DateTime']
  closingTime: Scalars['DateTime']
  slotCount: Scalars['Float']
  slotSize: Scalars['Duration']
}

export type CreateUserInput = {
  surname: Scalars['String']
  name: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createPlace: Place
  updatePlace: Place
  createUser: User
  updateUser: User
  createBooking: Booking
  updateBooking: Booking
}

export type MutationCreatePlaceArgs = {
  createPlaceInput: CreatePlaceInput
}

export type MutationUpdatePlaceArgs = {
  updatePlaceInput: UpdatePlaceInput
}

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput
}

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput
}

export type MutationCreateBookingArgs = {
  createBookingInput: CreateBookingInput
}

export type MutationUpdateBookingArgs = {
  updateBookingInput: UpdateBookingInput
}

export type Place = {
  __typename?: 'Place'
  placeId: Scalars['String']
  name: Scalars['String']
  openingTime: Scalars['DateTime']
  closingTime: Scalars['DateTime']
  slotCount: Scalars['Float']
  slotSize: Scalars['Duration']
  bookings: Array<Booking>
}

export type Query = {
  __typename?: 'Query'
  places: Array<Place>
  place: Place
  user: User
  bookings: Array<Booking>
  booking: Booking
  availableSlots: Scalars['Int']
}

export type QueryPlaceArgs = {
  id: Scalars['Int']
}

export type QueryUserArgs = {
  id: Scalars['Int']
}

export type QueryBookingArgs = {
  id: Scalars['Int']
}

export type QueryAvailableSlotsArgs = {
  startTime: Scalars['DateTime']
  slotSize: Scalars['Duration']
  placeId: Scalars['Int']
}

export type UpdateBookingInput = {
  start: Scalars['DateTime']
  duration: Scalars['Duration']
}

export type UpdatePlaceInput = {
  placeId: Scalars['String']
  name: Scalars['String']
  openingTime: Scalars['DateTime']
  closingTime: Scalars['DateTime']
  slotCount: Scalars['Float']
  slotSize: Scalars['Duration']
}

export type UpdateUserInput = {
  uuid: Scalars['String']
  surname: Scalars['String']
  name: Scalars['String']
}

export type User = {
  __typename?: 'User'
  uuid: Scalars['String']
  surname: Scalars['String']
  name: Scalars['String']
  bookings: Array<Booking>
}
