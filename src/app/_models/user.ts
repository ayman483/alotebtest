export class User {
  'id': number;
  'email': string;
  'password': string;
  'first_name': string;
  'last_name': string;
  'token': string;
  'role': number;
  'status': number;
}

export class Order {
  'id': number;
  'title': string;
  'description': string;
  'pdf_file':string;
  'status': number;
}

export class Log {
  'id': number;
  'user': string;
  'title': string;
  'entity': string;
  'service':string;
  'create_date':string;
  'item': string;
  'target_user': string;
}
