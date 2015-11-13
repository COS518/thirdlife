/*******************************************************************************
 * main.cpp
 * --------
 * Where all the magic happens...
 *
 ******************************************************************************/

#include <iostream>
#include "TCPServer.h"

using namespace std;

int main(int argc, char *argv[]) {

  cout << "Hello, world!" << endl;

  TCPServer *server = new TCPServer(8124);

  server->listen();

  pthread_exit(NULL);
  return 0;
}