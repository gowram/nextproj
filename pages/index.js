import axios from 'axios';
import Layout from '../components/Layout'
import EmployeeList from '../components/EmployeeList'
import Error from 'next/error'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class extends React.Component {

  static async getInitialProps({ req, res, query }) {
    var empList, page;

    try {
      page = parseInt(query.page || 1)
      const res = await axios.get(`https://empgene-qpuwizmavx.now.sh/all`)      
      empList = await res.data;
    } catch(e) {
      empList = undefined
    }

    return { empList, page }
  }

  render() {
    const { empList, page } = this.props

    if( typeof empList === 'undefined' || ! empList ) return <Error statusCode={503} />

    return <Layout title={'Indegene Employee app'} 
                   description={'A demo PWA app built with React and Next.JS'}>           
            

            <EmployeeList employees={empList} />           

      <style jsx>{`
        footer {
          padding: 2em 1em;
        }
        footer a {
          font-size: 1.5em;
          font-weight: bold;
          color: #ff6600;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  }

}