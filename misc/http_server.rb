require 'socket'

puts "listening on port 1234"

server = TCPServer.new('127.0.0.1', 1234)

Socket.accept_loop(server) do |connection|
  connection.print "HTTP/1.1 200 OK\r\nContent-type:text/html\r\n"

  request = connection.gets 

  puts request

  request_filename = request.gsub(/GET\ \//, '').gsub(/\ HTTP.*/, '')
  filename = request_filename.chomp

  if filename == ""
    filename = "index.html"
  end

  begin
    f = File.open(filename, "r")
    content = f.read()
    connection.print "Content-length: #{f.size}"
    connection.print "Connection: close\r\n"
    connection.print "\r\n"

    connection.print content 

  rescue Errno::ENOENT 
    connection.print "File not found"
    connection.print filename
  end
  connection.close 
end