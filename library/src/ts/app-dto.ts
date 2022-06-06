export interface CreateBookDto {
  title: string,
  description?: string,
  authors?: string,
  favorite?: string,
  fileCover?: string,
  fileName?: string,
}

export interface GetUserDto {
  username: string,
}

export interface SaveUserDto extends GetUserDto {
  password: string,
}


