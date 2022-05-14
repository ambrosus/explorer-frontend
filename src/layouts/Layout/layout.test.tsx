import { Layout } from "./index";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() })

const setUp = (props:any) => shallow(<Layout {...props}> <div className='children'>children</div></Layout>)

describe("should render Layout component", () => {
  let component :any;
  beforeEach(() => {
    component = setUp({});
  });

  it("should render children", () => {
    expect(component.find('.children').length).toBe(1);
  });

  it("should contain .layout wrapper", () => {
    const wrapper = component.find(".layout");
    expect(wrapper.length).toBe(1);
  });

  it("should contain link", () => {
    const wrapper = component.find(".page");
    expect(wrapper.length).toBe(1);
  });

});
