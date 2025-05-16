import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Loader2, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setCompanies } from "@/redux/companySlice";
import { toast } from "sonner";
import { Button } from "../ui/button";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  const [loadingCompanyId, setLoadingCompanyId] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);

  const deleteCompany = async (companyId) => {
    try {
      setLoadingCompanyId(companyId);

      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, { withCredentials: true });
      if (res.data.success) {
        const updatesCompanies = companies.filter((company) => company._id !== companyId);
        setFilterCompany(updatesCompanies);
        dispatch(setCompanies(updatesCompanies));
        toast.success(res.data.message);
        setOpenPopoverId(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCompanyId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Table className="shadow-lg my-4">
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>website</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[16px] font-medium">
          {filterCompany?.map((company) => (
            <tr>
              <TableCell>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell className="cursor-pointer text-grey-200  ">
                <a href="https://www.google.com/search?q=microsoft+careers&rlz=1C1CHBF_enIN1056IN1056&oq=microsift+caree&gs_lcrp=EgZjaHJvbWUqDAgBEAAYChixAxiABDIGCAAQRRg5MgwIARAAGAoYsQMYgAQyDAgCEAAYChixAxiABDIJCAMQABgKGIAEMgkIBBAAGAoYgAQyCQgFEAAYChiABDIJCAYQABgKGIAEMgYIBxAFGEDSAQg5Njg0ajBqN6gCCLACAfEFhrJXIseUe7HxBYayVyLHlHux&sourceid=chrome&ie=UTF-8">
                  {company.website}
                </a>
              </TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>

              <TableCell className="text-right cursor-pointer">
                <Popover open={openPopoverId === company._id} onOpenChange={(open) => setOpenPopoverId(open ? company._id : null)}>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 h-32">
                    <div className="flex flex-col gap-3 ">
                      <Button onClick={() => navigate(`/admin/companies/${company._id}`)} className="bg-[#5bc783] w-full">
                        Edit
                      </Button>

                      {loadingCompanyId === company._id ? (
                        <Button className="w-full" disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </Button>
                      ) : (
                        <Button onClick={() => deleteCompany(company._id)} className="w-full bg-[#ac2b3b]">
                          Delete
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
