import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, ExternalLink, Download, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-slate-900">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </a>
              <a href="#projects" className="text-slate-600 hover:text-slate-900 transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-slate-600 hover:text-slate-900 transition-colors">
                Skills
              </a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Alex Johnson
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Full-stack developer passionate about creating beautiful, functional web applications that solve
                real-world problems and deliver exceptional user experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>
              <div className="flex space-x-4 mt-8">
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                  <Mail className="h-6 w-6" />
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                  <img
                    src="/developer-headshot.png"
                    alt="Alex Johnson"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">About Me</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              I'm a passionate developer with 5+ years of experience building scalable web applications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                I specialize in modern web technologies and have a strong background in both frontend and backend
                development. My journey started with a Computer Science degree, and I've been continuously learning and
                adapting to new technologies ever since.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                When I'm not coding, you can find me contributing to open-source projects, writing technical blog posts,
                or exploring the latest in web development trends.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-600">San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-600">5+ Years Experience</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">50+</div>
                  <div className="text-slate-600">Projects Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">25+</div>
                  <div className="text-slate-600">Happy Clients</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">100+</div>
                  <div className="text-slate-600">GitHub Commits</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">5+</div>
                  <div className="text-slate-600">Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Skills & Technologies</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Here are the technologies and tools I work with regularly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Frontend</CardTitle>
                <CardDescription>Building beautiful user interfaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Vue.js</Badge>
                  <Badge variant="secondary">Sass</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Backend</CardTitle>
                <CardDescription>Server-side development & APIs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">Express</Badge>
                  <Badge variant="secondary">FastAPI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Tools & Others</CardTitle>
                <CardDescription>Development tools & platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Vercel</Badge>
                  <Badge variant="secondary">Figma</Badge>
                  <Badge variant="secondary">Jest</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A selection of my recent work and personal projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src="/modern-ecommerce-dashboard.png"
                  alt="E-commerce Platform"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  E-commerce Platform
                  <div className="flex space-x-2">
                    <Link href="#" className="text-slate-400 hover:text-slate-600">
                      <Github className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="text-slate-400 hover:text-slate-600">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </CardTitle>
                <CardDescription>
                  Full-stack e-commerce solution with payment integration and admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    React
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Node.js
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Stripe
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src="/task-management-app.png"
                  alt="Task Management App"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Task Management App
                  <div className="flex space-x-2">
                    <Link href="#" className="text-slate-400 hover:text-slate-600">
                      <Github className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="text-slate-400 hover:text-slate-600">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </CardTitle>
                <CardDescription>
                  Collaborative task management tool with real-time updates and team features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Next.js
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Socket.io
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    MongoDB
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src="/weather-app-interface.png"
                  alt="Weather Dashboard"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Weather Dashboard
                  <div className="flex space-x-2">
                    <Link href="#" className="text-slate-400 hover:text-slate-600">
                      <Github className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="text-slate-400 hover:text-slate-600">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </CardTitle>
                <CardDescription>
                  Beautiful weather app with location-based forecasts and interactive maps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Vue.js
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    API
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Charts
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Let's Work Together</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas
            to life.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-slate-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600">alex@example.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Linkedin className="h-8 w-8 text-slate-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">LinkedIn</h3>
                <p className="text-slate-600">@alexjohnson</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Github className="h-8 w-8 text-slate-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">GitHub</h3>
                <p className="text-slate-600">@alexjohnson</p>
              </CardContent>
            </Card>
          </div>

          <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2024 Alex Johnson. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
